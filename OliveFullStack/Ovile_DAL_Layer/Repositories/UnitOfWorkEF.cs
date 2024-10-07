using Ovile_DAL_Layer.EF;
using Ovile_DAL_Layer.Interfaces;
using Ovile_DAL_Layer.Entities;
using System;
using System.Threading.Tasks;

namespace Ovile_DAL_Layer.Repositories
{
    public class UnitOfWorkEF : IUnitOfWork
    {
        private bool disposed = false;
        private readonly NewsContext _context;
        private NewsModelRepository _newsRepository;
        private CategoryModelRepository _categoryRepository;
       

        public IRepository<News> News => _newsRepository ??= new NewsModelRepository(_context);
        public IRepository<Category> Categories => _categoryRepository ??= new CategoryModelRepository(_context);


        public UnitOfWorkEF(NewsContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed) return;
            if (disposing)
            {
                _context.Dispose();
            }
            disposed = true;
        }

        public async Task CommitChanges() => await _context.SaveChangesAsync();
    }
}