using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Ovile_BLL_Layer.DTO;
using Ovile_BLL_Layer.Infrastructure.Exceptions;
using Ovile_BLL_Layer.Interfaces;
using Ovile_DAL_Layer.Entities;
using Ovile_DAL_Layer.Interfaces;

namespace Notes.BusinessLogicLayer.Services
{
    public class NewsService : INewsService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public NewsService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        /// <summary>
        /// Получить все нововсти
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<NewsDTO>> GetAllNews()
        {
            var news = await _unitOfWork
                .News
                .GetAll();

            

            var newsDto = _mapper.Map<List<NewsDTO>>(news);

            return newsDto;
        }

        /// <summary>
        /// Получить одну новость по айди
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<NewsDTO> GetNewsById(Guid id)
        {
            var news = await _unitOfWork
                .News
                .Get(id);

            var newsDto = _mapper.Map<NewsDTO>(news);

            return newsDto;
        }

        /// <summary>
        /// Создать новость
        /// </summary>
        /// <param name="newNews"></param>
        /// <returns></returns>
        public async Task<NewsDTO> CreateNews(NewsDTO newNews)
        {
            try
            {
                var news = _mapper.Map<News>(newNews);

                news.CreatedAt = DateTime.Now;
                news.Id = Guid.NewGuid();

                await _unitOfWork.News.Create(news);
                await _unitOfWork.CommitChanges();

                return newNews;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        /// <summary>
        /// Обновить новсти
        /// </summary>
        /// <param name="updatedNews"></param>
        /// <returns></returns>
        /// <exception cref="NewsDoesNotExist"></exception>
        public async Task<NewsDTO> UpdateNews(NewsDTO updatedNews)
        {
            var newsExists = await _unitOfWork
                .News
                .Get(updatedNews.Id) != null;

            if (!newsExists)
            {
                throw new NewsDoesNotExist(updatedNews.Id.ToString());
            }

            var news = _mapper.Map<News>(updatedNews);

            await _unitOfWork
                .News
                .Update(news);

            await _unitOfWork.CommitChanges();

            return updatedNews;
        }



        /// <summary>
        /// Удалить новость
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NewsDoesNotExist"></exception>
        public async Task DeleteNews(Guid id)
        {
            var hashtagExists = await _unitOfWork
                .News
                .Get(id) != null;

            if (!hashtagExists)
            {
                throw new NewsDoesNotExist(id.ToString());
            }

            await _unitOfWork
                .News
                .Delete(id);

            await _unitOfWork.CommitChanges();
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}