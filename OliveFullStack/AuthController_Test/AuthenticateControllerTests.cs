using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using OliveFullStack.PresentationLayer.Controllers;
using OliveFullStack.PresentationLayer.Models.AuthorizationModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Http;

namespace AuthenticateControllerTests
{
    public class AuthenticateControllerTests
    {
        //{
        //    private Mock<UserManager<IdentityUser>> _mockUserManager;
        //    private Mock<RoleManager<IdentityRole>> _mockRoleManager;
        //    private Mock<IConfiguration> _mockConfiguration;
        //    private AuthenticateController _controller;

        //    public AuthenticateControllerTests()
        //    {
        //        // Mocking UserManager<IdentityUser>
        //        _mockUserManager = new Mock<UserManager<IdentityUser>>(
        //            Mock.Of<IUserStore<IdentityUser>>(), null, null, null, null, null, null, null, null);

        //        // Mocking RoleManager<IdentityRole> by passing proper mocks for dependencies
        //        var roleStoreMock = new Mock<IRoleStore<IdentityRole>>();
        //        _mockRoleManager = new Mock<RoleManager<IdentityRole>>(
        //            roleStoreMock.Object, null, null, null, null);

        //        // Mocking IConfiguration
        //        _mockConfiguration = new Mock<IConfiguration>();

        //        // Injecting dependencies into the controller
        //        _controller = new AuthenticateController(_mockUserManager.Object, _mockRoleManager.Object, _mockConfiguration.Object);
        //    }

        //    //[Fact]

        //    //public void Result_Register_Test()
        //    //{
        //    //    IdentityUser user = new()
        //    //    {
        //    //        Email = "test@gmail.com",
        //    //        SecurityStamp = Guid.NewGuid().ToString(),
        //    //        UserName = "Valera"
        //    //    };

        //    //    _mockUserManager.


        //    //    _controller.Register<IdentityUser>();
        //    // }
        //    [Fact]
        //    public async Task Register_UserAlreadyExists_ReturnsStatusCode500()
        //    {
        //        // Arrange
        //        var registerModel = new RegisterModel { Username = "testuser", Email = "testuser@example.com", Password = "Test@123" };
        //        _mockUserManager.Setup(x => x.FindByNameAsync(registerModel.Username)).ReturnsAsync(new IdentityUser());

        //        // Act
        //        var result = await _controller.Register(registerModel);

        //        // Assert
        //        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        //        Assert.Equal(500, statusCodeResult.StatusCode);
        //    }

        //    [Fact]
        //    public async Task Login_WithValidCredentials_ReturnsOkResult()
        //    {
        //        // Arrange
        //        var user = new IdentityUser { UserName = "testuser" };
        //        _mockUserManager.Setup(x => x.FindByNameAsync("testuser")).ReturnsAsync(user);
        //        _mockUserManager.Setup(x => x.CheckPasswordAsync(user, "password")).ReturnsAsync(true);
        //        _mockUserManager.Setup(x => x.GetRolesAsync(user)).ReturnsAsync(new List<string> { "User" });

        //        // Act
        //        var result = await _controller.Login(new LoginModel { Username = "testuser", Password = "password" });

        //        // Assert
        //        Assert.IsInstanceOf<OkObjectResult>(result);

        /////////30.09.2024
        
        private readonly Mock<UserManager<IdentityUser>> _userManagerMock;
        private readonly Mock<RoleManager<IdentityRole>> _roleManagerMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly AuthenticateController _controller;

        public AuthenticateControllerTests()
        {
            _userManagerMock = new Mock<UserManager<IdentityUser>>(
                Mock.Of<IUserStore<IdentityUser>>(), null, null, null, null, null, null, null, null);
            _roleManagerMock = new Mock<RoleManager<IdentityRole>>(
                Mock.Of<IRoleStore<IdentityRole>>(), null, null, null, null);

            // Setup configuration with JWT settings
            _configurationMock = new Mock<IConfiguration>();
            _configurationMock.Setup(x => x["JWT:Secret"]).Returns("your-very-long-secret-key-here-at-least-16-characters");
            _configurationMock.Setup(x => x["JWT:ValidIssuer"]).Returns("test-issuer");
            _configurationMock.Setup(x => x["JWT:ValidAudience"]).Returns("test-audience");

            _controller = new AuthenticateController(_userManagerMock.Object, _roleManagerMock.Object, _configurationMock.Object);
        }
        // Тест на тип запроса для Login

        [Fact]
        public void Login_ShouldHaveHttpPostAttribute()
        {
            var method = typeof(AuthenticateController).GetMethod(nameof(AuthenticateController.Login));
            var postAttribute = method.GetCustomAttributes(typeof(HttpPostAttribute), false);
            Assert.NotEmpty(postAttribute);
        }

        // Тест на успешный тип ответа (OkObjectResult) для Login

        [Fact]
        public async Task Login_ShouldReturnOk_WhenLoginIsSuccessful()
        {
            var loginModel = new LoginModel { Username = "testuser", Password = "Test@123" };
            var user = new IdentityUser { UserName = "testuser" };
            _userManagerMock.Setup(u => u.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(user);
            _userManagerMock.Setup(u => u.CheckPasswordAsync(It.IsAny<IdentityUser>(), It.IsAny<string>())).ReturnsAsync(true);
            _userManagerMock.Setup(u => u.GetRolesAsync(It.IsAny<IdentityUser>())).ReturnsAsync(new List<string>());

            var result = await _controller.Login(loginModel);

            Assert.IsType<OkObjectResult>(result);
        }

        // Тест на BadRequest при отсутствии данных в Login

        [Fact]
        public async Task Login_ShouldReturnBadRequest_WhenModelIsNull()
        {
            var result = await _controller.Login(null);

            Assert.Equal(StatusCodes.Status400BadRequest, (result as ObjectResult)?.StatusCode);
        }

        // Тест на тип запроса для Register
        [Fact]
        public void Register_ShouldHaveHttpPostAttribute()
        {
            var method = typeof(AuthenticateController).GetMethod(nameof(AuthenticateController.Register));
            var postAttribute = method.GetCustomAttributes(typeof(HttpPostAttribute), false);
            Assert.NotEmpty(postAttribute);
        }

        // Тест на успешный тип ответа (OkObjectResult) для Register
        [Fact]
        public async Task Register_ShouldReturnOk_WhenRegistrationIsSuccessful()
        {
            var registerModel = new RegisterModel { Username = "testuser", Password = "Test@123", Email = "test@test.com" };
            _userManagerMock.Setup(u => u.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((IdentityUser)null);
            _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<IdentityUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

            var result = await _controller.Register(registerModel);

            Assert.IsType<OkObjectResult>(result);
        }

        // Тест на BadRequest при отсутствии данных в Register
        [Fact]
        public async Task Register_ShouldReturnBadRequest_WhenModelIsNull()
        {
            var result = await _controller.Register(null);

            Assert.Equal(StatusCodes.Status400BadRequest, (result as ObjectResult)?.StatusCode);
        }

        [Fact]
        public void RegisterAdmin_ShouldHaveHttpPostAttribute()
        {
            var method = typeof(AuthenticateController).GetMethod(nameof(AuthenticateController.RegisterAdmin));
            var postAttribute = method.GetCustomAttributes(typeof(HttpPostAttribute), false);
            Assert.NotEmpty(postAttribute);
        }

        // Тест на успешный тип ответа (OkObjectResult) для RegisterAdmin
        [Fact]
        public async Task RegisterAdmin_ShouldReturnOk_WhenRegistrationIsSuccessful()
        {
            var registerModel = new RegisterModel { Username = "admin", Password = "Admin@123", Email = "admin@test.com" };
            _userManagerMock.Setup(u => u.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((IdentityUser)null);
            _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<IdentityUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            _roleManagerMock.Setup(r => r.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(false);
            _roleManagerMock.Setup(r => r.CreateAsync(It.IsAny<IdentityRole>())).ReturnsAsync(IdentityResult.Success);

            var result = await _controller.RegisterAdmin(registerModel);

            Assert.IsType<OkObjectResult>(result);
        }

        // Тест на BadRequest при отсутствии данных в RegisterAdmin
        [Fact]
        public async Task RegisterAdmin_ShouldReturnBadRequest_WhenModelIsNull()
        {
            var result = await _controller.RegisterAdmin(null);

            Assert.Equal(StatusCodes.Status400BadRequest, (result as ObjectResult)?.StatusCode);
        }
    }
}