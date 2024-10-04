using Ovile_DAL_Layer.Entities;

namespace Ovile_DAL_Layer.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<News> News { get; }
        IRepository<Category> Categories { get; }

        Task CommitChanges();
    }
}