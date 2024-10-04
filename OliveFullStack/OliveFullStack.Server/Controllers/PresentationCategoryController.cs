using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Ovile_BLL_Layer.DTO;
using Ovile_BLL_Layer.Interfaces;
using OliveFullStack.PresentationLayer.Models.Responses;
using OliveFullStack.PresentationLayer.Models.Requests.CategoryRequests;
using Microsoft.AspNetCore.Authorization;

namespace OliveFullStack.PresentationLayer.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PresentationCategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public PresentationCategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        /// <summary>
        /// Получить все категории (доступ для всех)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetAllCategories();
            var categoryResponses = _mapper.Map<List<CategoryResponse>>(categories);
            return Ok(categoryResponses);
        }

        /// <summary>
        /// Получение категории по айди (доступ для всех)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetSingle([FromRoute] Guid id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            var categoryResponse = _mapper.Map<CategoryResponse>(category);
            return Ok(categoryResponse);
        }

        /// <summary>
        /// Добавить категорию (Только для администраторов)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryRequest request)
        {
            var categoryDto = _mapper.Map<CategoryDTO>(request);

            try
            {
                var createdCategory = await _categoryService.CreateCategory(categoryDto);
                return Ok(_mapper.Map<CategoryResponse>(createdCategory));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Обновить категорию по айди (для админов)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequest request)
        {
            var categoryDto = _mapper.Map<CategoryDTO>(request);
            categoryDto.Id = id;

            try
            {
                var updatedCategory = await _categoryService.UpdateCategory(categoryDto);
                return Ok(_mapper.Map<CategoryResponse>(updatedCategory));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Удалить категорию по айди (для админов)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            try
            {
                await _categoryService.DeleteCategory(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
