using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OliveFullStack.PresentationLayer.Controllers;
using OliveFullStack.PresentationLayer.Models.Requests;
using OliveFullStack.PresentationLayer.Models.Requests.NewsRequests;
using OliveFullStack.PresentationLayer.Models.Responses;
using Ovile_BLL_Layer.DTO;
using Ovile_BLL_Layer.Infrastructure.Exceptions;
using Ovile_BLL_Layer.Interfaces;
using Ovile_BLL_Layer.Services;
using Ovile_DAL_Layer.Entities;

namespace PresentationNewsController_Testing
{
    public class PresentationNewsControllerTests
    {
        private readonly Mock<INewsService> _mockNewsService; // ћок дл€ INewsService
        private readonly Mock<IMapper> _mockMapper;           // ћок дл€ IMapper
        private readonly PresentationNewsController _controller; // Ёкземпл€р контроллера
        private readonly Mock<ICategoryService > _categoryService;

        public PresentationNewsControllerTests()
        {
            // —оздаем поддельные (mock) реализации INewsService и IMapper
            _mockNewsService = new Mock<INewsService>();
            _mockMapper = new Mock<IMapper>();
            _categoryService = new Mock<ICategoryService>();

            // —оздаем контроллер, передава€ в него поддельные сервисы
            _controller = new PresentationNewsController(_mockNewsService.Object, _categoryService.Object, _mockMapper.Object);
        }

        // Ётот метод предоставл€ет данные дл€ теста
        public static IEnumerable<object[]> GetTestNewsData()
        {
            // ѕервый набор данных: пустой список новостей
            yield return new object[]
            {
                new List<NewsDTO>(),                   // ¬ходные данные (пустой список новостей)
                new List<NewsResponse>()            // ќжидаемые выходные данные (пустой список NewsResponse)
            };

            // ¬торой набор данных: один объект новости
            yield return new object[]
            {
                new List<NewsDTO>                     // ¬ходные данные (одна новость)
                {
                    new NewsDTO { Id=Guid.NewGuid(), Title="News 1", Description="Description News 1", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now}
                },
                new List<NewsResponse>             // ќжидаемые выходные данные (один NewsResponse)
                {
                    new NewsResponse { Id=Guid.NewGuid(), Title="News 1", Description="Description News 1", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now}
                }
            };

            // “ретий набор данных: несколько новостей
            yield return new object[]
            {
                new List<NewsDTO>                     // ¬ходные данные (несколько новостей)
                {
                     new NewsDTO{ Id=Guid.NewGuid(), Title="News 1", Description="Description News 1", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now},
                     new NewsDTO{ Id=Guid.NewGuid(), Title="News 2", Description="Description News 2", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now}
                },
                new List<NewsResponse>             // ќжидаемые выходные данные (несколько NewsResponse)
                {
                   new NewsResponse{ Id=Guid.NewGuid(), Title="News 1", Description="Description News 1", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now},
                   new NewsResponse{ Id=Guid.NewGuid(), Title="News 2", Description="Description News 2", ImgSrc="src",Source="Internet",CreatedAt=DateTime.Now}
                }
            };
        }

        //GetAll
        // Theory Ч дл€ выполнени€ теста с разными данными, InlineData Ч дл€ передачи данных
        [Theory]
        [MemberData(nameof(GetTestNewsData))]
        public async Task GetAll_WhenCalled_ReturnsOkWithMappedNewsResponses(IEnumerable<NewsDTO> newsList, List<NewsResponse> mappedNewsResponses)
        {
            // Arrange: подготавливаем поддельные данные
            _mockNewsService.Setup(service => service.GetAllNews())
                .ReturnsAsync(newsList); // ¬ажно: возвращаем Task<IEnumerable<NewsDTO>>

            _mockMapper.Setup(mapper => mapper.Map<List<NewsResponse>>(newsList))
                .Returns(mappedNewsResponses);

            // Act: вызываем метод контроллера
            var result = await _controller.GetAll();

            // Assert: провер€ем, что результат - OkObjectResult (200 OK) с ожидаемыми данными
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedNewsResponses = Assert.IsType<List<NewsResponse>>(okResult.Value);
            Assert.Equal(mappedNewsResponses.Count, returnedNewsResponses.Count);

            _mockNewsService.Verify(service => service.GetAllNews(), Times.Once);
            _mockMapper.Verify(mapper => mapper.Map<List<NewsResponse>>(newsList), Times.Once);
        }

        //GetSingle - ok
        [Fact]
        public async Task GetSingle_WhenCalled_ReturnsOkWithMappedNewsResponse()
        {
            NewsDTO news = new NewsDTO()
            {
                Id = Guid.NewGuid(),
                Title = "Title",
                Description = "Description",
                CreatedAt = DateTime.UtcNow,
            };
            NewsResponse newsResponse = new NewsResponse()
            {
                Id = Guid.NewGuid(),
                Title = "Title",
                Description = "Description",
                CreatedAt = DateTime.UtcNow,
            };
            //Arrange
            _mockNewsService.Setup(service => service.GetNewsById(news.Id)).ReturnsAsync(news);
            //.ReturnsAsync(addNewsRequest);

            _mockMapper.Setup(service => service.Map<NewsResponse>(news))
                .Returns(newsResponse);

            //Act
            var result = await _controller.GetSingle(news.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<NewsResponse>(okResult.Value);
            Assert.Equal(newsResponse, returnValue);
            _mockNewsService.Verify(service => service.GetNewsById(news.Id), Times.Once);
            _mockMapper.Verify(service => service.Map<NewsResponse>(news), Times.Once);
        }

        //GetSingle - not found
        [Fact]
        public async Task GetSingle_WhenCalled_ReturnsNotFound()
        {
            Guid id = Guid.NewGuid();

            //Arrange
            _mockNewsService.Setup(service => service.GetNewsById(id)).ReturnsAsync((NewsDTO)null);

            var result = await _controller.GetSingle(id);

            var notFoundResult = Assert.IsType<NotFoundResult>(result);

        }

        //AddNews- return ok
        [Fact]
        public async Task AddNews_WhenCalled_ReturnsOkWithMappedNewsResponse()
        {
            // Arrange
            var mockMapper = new Mock<IMapper>();
            var mockNewsService = new Mock<INewsService>();
            var mockCategoryService = new Mock<ICategoryService>();

            var categoryId = Guid.NewGuid();
            var request = new AddNewsRequest
            {
                Category = categoryId.ToString(),
                // ƒобавьте другие необходимые свойства
            };

            var newsDto = new NewsDTO();
            var existingCategory = new CategoryDTO
            {
                Id = categoryId,
                Name = "Test Category"
            };
            var createdNews = new NewsDTO();
            var expectedResponse = new NewsResponse();

            mockMapper.Setup(m => m.Map<NewsDTO>(request)).Returns(newsDto);

            mockCategoryService
                .Setup(s => s.GetCategoryById(categoryId))
                .Returns(Task.FromResult(existingCategory));

            mockNewsService
                .Setup(s => s.CreateNews(It.IsAny<NewsDTO>()))
                .Returns(Task.FromResult(createdNews));

            mockMapper.Setup(m => m.Map<NewsResponse>(createdNews)).Returns(expectedResponse);

            // —оздаем контроллер с правильным пор€дком параметров
            var controller = new PresentationNewsController(
                mockNewsService.Object,
                mockCategoryService.Object,
                mockMapper.Object);

            // Act
            var result = await controller.AddNews(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<NewsResponse>(okResult.Value);
            Assert.Equal(expectedResponse, returnValue);

            // Verify
            mockMapper.Verify(m => m.Map<NewsDTO>(request), Times.Once);
            mockCategoryService.Verify(s => s.GetCategoryById(categoryId), Times.Once);
            mockNewsService.Verify(s => s.CreateNews(It.IsAny<NewsDTO>()), Times.Once);
            mockMapper.Verify(m => m.Map<NewsResponse>(createdNews), Times.Once);
        }

        //AddNews- return badrequest
        [Fact]
        public async Task AddNews_ReturnsBadRequest_WhenExceptionThrown()
        {
            // Arrange
            var request = new AddNewsRequest
            {
                Title = "AddNewsRequest Title",
                Description = "AddNewsRequest Description",
                ImgSrc = "AddNewsRequest img",
                Source = "Internet",
                Category = "8BAB584B-E7AC-4D9D-5D0A-08DCE3B9C621"
            };
            var newsDto = new NewsDTO
            {
                Title = "NewsDTO Title",
                Description = "NewsDTO Description",
                ImgSrc = "NewsDTO img",
                Source = "Internet",


            };

            _mockMapper.Setup(m => m.Map<NewsDTO>(request)).Returns(newsDto);
            _mockNewsService.Setup(s => s.CreateNews(newsDto)).ThrowsAsync(new Exception("Category does not exist."));

            // Act
            var result = await _controller.AddNews(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Category does not exist.", badRequestResult.Value);
        }

        // UpdateNews - returns ok
        [Fact]
        public async Task UpdateNews_ReturnsOkResult_WhenNewsUpdated()
        {
            // Arrange
            var id = Guid.NewGuid();
            var categoryId = Guid.Parse("8BAB584B-E7AC-4D9D-5D0A-08DCE3B9C621");
            var request = new UpdateNewsRequest
            {
                Title = "Updated Title",
                Description = "Updated Description",
                ImgSrc = "Updated img",
                Source = "Internet",
                CategoryId = categoryId.ToString()
            };
            var existingNewsDto = new NewsDTO
            {
                Id = id,
                Title = "Existing Title",
                Description = "Existing Description",
                ImgSrc = "Existing img",
                Source = "Internet",
                CategoryId = categoryId,
                CategoryName = "Existing Category"
            };
            var updatedNewsDto = new NewsDTO
            {
                Id = id,
                Title = request.Title,
                Description = request.Description,
                ImgSrc = request.ImgSrc,
                Source = request.Source,
                CategoryId = categoryId,
                CategoryName = "Updated Category"
            };
            var categoryDto = new CategoryDTO
            {
                Id = categoryId,
                Name = "Updated Category"
            };
            var expectedResponse = new NewsResponse
            {
                Id = id,
                Title = request.Title,
                Description = request.Description,
                ImgSrc = request.ImgSrc,
                Source = request.Source,
                CategoryId = categoryId,
                CategoryName = "Updated Category"
            };

            // Mock GetNewsById to return the existing news
            _mockNewsService.Setup(s => s.GetNewsById(id)).ReturnsAsync(existingNewsDto);

            // Mock GetCategoryById to return the category
            _categoryService.Setup(s => s.GetCategoryById(categoryId)).ReturnsAsync(categoryDto);

            // Setup mapper to map from request to existing NewsDTO
            _mockMapper.Setup(m => m.Map(request, existingNewsDto)).Returns(updatedNewsDto);

            // Setup UpdateNews to return the updated news
            _mockNewsService.Setup(s => s.UpdateNews(It.IsAny<NewsDTO>())).ReturnsAsync(updatedNewsDto);

            // Setup mapper to map from NewsDTO to NewsResponse
            _mockMapper.Setup(m => m.Map<NewsResponse>(updatedNewsDto)).Returns(expectedResponse);

            // Act
            var result = await _controller.UpdateNews(id, request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedNews = Assert.IsType<NewsResponse>(okResult.Value);
            Assert.Equal(expectedResponse.Id, returnedNews.Id);
            Assert.Equal(expectedResponse.Title, returnedNews.Title);
            Assert.Equal(expectedResponse.Description, returnedNews.Description);
            Assert.Equal(expectedResponse.ImgSrc, returnedNews.ImgSrc);
            Assert.Equal(expectedResponse.Source, returnedNews.Source);
            Assert.Equal(expectedResponse.CategoryId, returnedNews.CategoryId);
            Assert.Equal(expectedResponse.CategoryName, returnedNews.CategoryName);
        }

        [Fact]
        public async Task UpdateNews_ReturnsBadRequest_WhenExceptionThrown()
        {
            // Arrange
            var id = Guid.NewGuid();
            var request = new UpdateNewsRequest
            {
                Title = "AddNewsRequest Title",
                Description = "AddNewsRequest Description",
                ImgSrc = "AddNewsRequest img",
                Source = "Internet"
            };
            var newsDto = new NewsDTO
            {
                Id = id,
                Title = "NewsDTO Title",
                Description = "NewsDTO Description",
                ImgSrc = "NewsDTO img",
                Source = "Internet"
            };

            _mockMapper.Setup(m => m.Map<NewsDTO>(request)).Returns(newsDto);
            _mockNewsService.Setup(s => s.UpdateNews(newsDto))
                .ThrowsAsync(new Exception("Invalid GUID format for CategoryId"));

            // Act
            var result = await _controller.UpdateNews(id, request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid GUID format for CategoryId", badRequestResult.Value);
        }

        [Fact]
        public async Task UpdateNews_ReturnsBadRequest_WhenNewsDoesNotExist()
        {
            // Arrange
            var id = Guid.NewGuid();
            var request = new UpdateNewsRequest
            {
                Title = "AddNewsRequest Title",
                Description = "AddNewsRequest Description",
                ImgSrc = "AddNewsRequest img",
                Source = "Internet",
                CategoryId = "8BAB584B-E7AC-4D9D-5D0A-08DCE3B9C621"
            };
            var newsDto = new NewsDTO
            {
                Id = id,
                Title = "NewsDTO Title",
                Description = "NewsDTO Description",
                ImgSrc = "NewsDTO img",
                Source = "Internet",
                CategoryId = Guid.NewGuid()
            };

            _mockMapper.Setup(m => m.Map<NewsDTO>(request)).Returns(newsDto);
            _mockNewsService.Setup(s => s.UpdateNews(newsDto))
                .ThrowsAsync(new NewsDoesNotExist(id.ToString()));

            // Act
            var result = await _controller.UpdateNews(id, request);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    

    //DeleteNews - return ok
    [Fact]
        public async Task DeleteNews_ReturnsOk_WhenNewsIsDeleted()
        {
            // Arrange
            var newsId = Guid.NewGuid();
            _mockNewsService.Setup(s => s.DeleteNews(newsId)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteNews(newsId);

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        //DeleteNews - return badRequest
        [Fact]
        public async Task DeleteNews_ReturnsBadRequest_WhenExceptionThrown()
        {
            // Arrange
            var newsId = Guid.NewGuid();
            _mockNewsService.Setup(s => s.DeleteNews(newsId)).ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.DeleteNews(newsId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        //DeleteNews - return exception
        [Fact]
        public async Task DeleteNews_ThrowsNewsDoesNotExistException_WhenNewsDoesNotExist()
        {
            // Arrange
            var newsId = Guid.NewGuid();
            _mockNewsService
               .Setup(s => s.DeleteNews(newsId))
                .ThrowsAsync(new NewsDoesNotExist(newsId.ToString()));

            // Act
            var result = await _controller.DeleteNews(newsId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal($"News with ID {newsId} does not exist.", badRequestResult.Value);
        }

        [Fact]
        public async Task DeleteNewsList_ReturnsBadRequest_WhenIdsAreNull()
        {
            // Arrange
            var request = new DeleteNewsRequest { ids = null };

            // Act
            var result = await _controller.DeleteNews(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("The ids field is required and must not be empty.", badRequestResult.Value);
        }

        [Fact]
        public async Task DeleteNewsList_ReturnsBadRequest_WhenIdsAreEmpty()
        {
            // Arrange
            var request = new DeleteNewsRequest { ids = new List<Guid>() };

            // Act
            var result = await _controller.DeleteNews(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("The ids field is required and must not be empty.", badRequestResult.Value);
        }

        [Fact]
        public async Task DeleteNewsList_ReturnsOk_WhenNewsDeletedSuccessfully()
        {
            // Arrange
            var ids = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() };
            var request = new DeleteNewsRequest { ids = ids };

            // Mocking successful deletion
            _mockNewsService.Setup(s => s.DeleteNews(It.IsAny<Guid>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteNews(request);

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
            _mockNewsService.Verify(s => s.DeleteNews(It.IsAny<Guid>()), Times.Exactly(ids.Count));
        }

        [Fact]
        public async Task DeleteNewsList_ReturnsBadRequest_WhenExceptionThrown()
        {
            // Arrange
            var ids = new List<Guid> { Guid.NewGuid() };
            var request = new DeleteNewsRequest { ids = ids };

            _mockNewsService.Setup(s => s.DeleteNews(It.IsAny<Guid>()))
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _controller.DeleteNews(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }
    }

}







