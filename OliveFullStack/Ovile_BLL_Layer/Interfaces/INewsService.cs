using Ovile_BLL_Layer.DTO;

namespace Ovile_BLL_Layer.Interfaces
{
    public interface INewsService
    {
        Task<IEnumerable<NewsDTO>> GetAllNews();
        Task<NewsDTO> GetNewsById(Guid id);
        Task<NewsDTO> CreateNews(NewsDTO newHashtag);
        Task<NewsDTO> UpdateNews(NewsDTO updatedHashtag);
        Task DeleteNews(Guid id);
        void Dispose();
    }
}
