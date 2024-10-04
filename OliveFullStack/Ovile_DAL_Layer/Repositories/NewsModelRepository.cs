using Microsoft.EntityFrameworkCore;
using Ovile_DAL_Layer.EF;
using Ovile_DAL_Layer.Entities;
using Ovile_DAL_Layer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ovile_DAL_Layer.Repositories
{
    public class NewsModelRepository : IRepository<News>
    {
        private readonly NewsContext _context;

        public NewsModelRepository(NewsContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Получить все новости
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<News>> GetAll()
        {
            return await _context.News.ToListAsync();
        }


        /// <summary>
        /// Получить новость по айди
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<News?> Get(Guid id)
        {
            return await _context.News.FindAsync(id);
        }


        /// <summary>
        /// Найти новость
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public async Task<News> Find(Func<News, bool> predicate)
        {
            return await Task.Run(() => _context.Set<News>().FirstOrDefault(predicate));
        }

        /// <summary>
        /// Создать новость
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task Create(News item)
        {
            await _context.News.AddAsync(item);
        }

        /// <summary>
        /// Обновить новость
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task Update(News item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }

        /// <summary>
        /// Удалить новость
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Delete(Guid id)
        {
            var news = await _context.News.FindAsync(id);
            if (news != null)
            {
                _context.News.Remove(news);
            }
        }
    }
}