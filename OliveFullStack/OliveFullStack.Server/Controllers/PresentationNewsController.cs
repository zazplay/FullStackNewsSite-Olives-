using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Ovile_BLL_Layer.DTO;
using Ovile_BLL_Layer.Interfaces;
using OliveFullStack.PresentationLayer.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using OliveFullStack.PresentationLayer.Models.Requests.NewsRequests;
using OliveFullStack.PresentationLayer.Models.Requests.CategoryRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OliveFullStack.PresentationLayer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PresentationNewsController : Controller
    {
        private readonly INewsService _newsService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public PresentationNewsController(INewsService newsService, ICategoryService categoryService, IMapper mapper)
        {
            _newsService = newsService;
            _categoryService = categoryService;
            _mapper = mapper;
        }

       

        /// <summary>
        /// Получить все новости (доступ для всех)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var news = await _newsService.GetAllNews();
            var newsResponses = _mapper.Map<List<NewsResponse>>(news);
            return Ok(newsResponses);
        }

        /// <summary>
        /// Получение новости по айди (доступ для всех)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetSingle([FromRoute] Guid id)
        {
            var news = await _newsService.GetNewsById(id);
            if (news == null)
            {
                return NotFound();
            }
            var newsResponse = _mapper.Map<NewsResponse>(news);
            return Ok(newsResponse);
        }

        /// <summary>
        /// Добавить новость (Только для администраторов)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddNews([FromBody] AddNewsRequest request)
        {
            var newsDto = _mapper.Map<NewsDTO>(request);

            if (Guid.TryParse(request.Category, out Guid categoryGuid))
            {
                var existingCategory = await _categoryService.GetCategoryById(categoryGuid);
                if (existingCategory == null)
                {
                    return BadRequest("Category does not exist.");
                }
                newsDto.CategoryId = existingCategory.Id;
                newsDto.CategoryName = existingCategory.Name; // Set CategoryName from the existing category
            }
            else
            {
                return BadRequest("Invalid Category GUID");
            }

            try
            {
                var createdNews = await _newsService.CreateNews(newsDto);
                return Ok(_mapper.Map<NewsResponse>(createdNews));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateNews([FromRoute] Guid id, [FromBody] UpdateNewsRequest request)
        {
            try
            {
                // Проверяем существование новости
                var existingNews = await _newsService.GetNewsById(id);
                if (existingNews == null)
                {
                    return NotFound($"News with ID {id} does not exist.");
                }

                // Проверяем валидность CategoryId
                if (!Guid.TryParse(request.CategoryId, out Guid categoryGuid))
                {
                    return BadRequest("Invalid GUID format for CategoryId");
                }

                // Проверяем существование категории
                var existingCategory = await _categoryService.GetCategoryById(categoryGuid);
                if (existingCategory == null)
                {
                    return BadRequest($"Category with ID {categoryGuid} does not exist.");
                }

                // Обновляем существующую новость
                var updatedNewsDto = _mapper.Map(request, existingNews);
                updatedNewsDto.CategoryId = categoryGuid;
                updatedNewsDto.CategoryName = existingCategory.Name;

                var updatedNews = await _newsService.UpdateNews(updatedNewsDto);
                return Ok(_mapper.Map<NewsResponse>(updatedNews));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Удалить новость по айди (для админов)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNews([FromRoute] Guid id)
        {
            try
            {
                await _newsService.DeleteNews(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Удалить несколько новостей (для админов)
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteByIds")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsRequest request)
        {
            if (request?.ids == null || !request.ids.Any())
            {
                return BadRequest("The ids field is required and must not be empty.");
            }

            try
            {
                foreach (var id in request.ids)
                {
                    await _newsService.DeleteNews(id);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
