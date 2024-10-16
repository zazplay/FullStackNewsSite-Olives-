using Microsoft.EntityFrameworkCore;
using Ovile_DAL_Layer.EF;
using Ovile_DAL_Layer.Entities;
using Ovile_DAL_Layer.Interfaces;

namespace Ovile_DAL_Layer.Repositories
{
    public class CategoryModelRepository : IRepository<Category>
    {

        private readonly NewsContext _context;

        public CategoryModelRepository(NewsContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Получить все категории
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }


        /// <summary>
        /// Получить категорию по айди
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Category?> Get(Guid id)
        {
            return await _context.Categories.FirstOrDefaultAsync(iterator => iterator.Id == id);
        }


        /// <summary>
        /// Найти категорию
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public async Task<Category> Find(Func<Category, bool> predicate)
        {
            return await Task.Run(() => _context.Set<Category>().FirstOrDefault(predicate));
        }


        /// <summary>
        /// Создать категорию
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task Create(Category item)
        {
            await _context.Categories.AddAsync(item);
        }


        /// <summary>
        /// Обновить категорию
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task Update(Category item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }


        /// <summary>
        /// Удалить категорию
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Delete(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
            }
        }
    }
}
