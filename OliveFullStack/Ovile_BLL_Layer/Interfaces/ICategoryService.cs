using Ovile_BLL_Layer.DTO;

namespace Ovile_BLL_Layer.Interfaces
{
    public interface ICategoryService : IDisposable
    {
        Task<IEnumerable<CategoryDTO>> GetAllCategories();
        Task<CategoryDTO> GetCategoryById(Guid id);
        Task<CategoryDTO> GetCategoryByName(string name);
        Task<CategoryDTO> CreateCategory(CategoryDTO newCategory);
        Task<CategoryDTO> UpdateCategory(CategoryDTO updatedCategory);
        Task DeleteCategory(Guid id);
    }
}
