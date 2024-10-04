using Ovile_BLL_Layer.DTO;
using Ovile_BLL_Layer.Interfaces;
using Ovile_DAL_Layer.Interfaces;
using Ovile_DAL_Layer.Entities;
using AutoMapper;

namespace Ovile_BLL_Layer.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllCategories()
        {
            var categories = await _unitOfWork.Categories.GetAll();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetCategoryById(Guid id)
        {
            var category = await _unitOfWork.Categories.Get(id);
            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task<CategoryDTO> GetCategoryByName(string name)
        {
            var category = await _unitOfWork.Categories.Find(c => c.Name == name);
            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task<CategoryDTO> CreateCategory(CategoryDTO newCategory)
        {
            var categoryEntity = _mapper.Map<Category>(newCategory);
            newCategory.Id = Guid.NewGuid();
            await _unitOfWork.Categories.Create(categoryEntity);
            await _unitOfWork.CommitChanges();
            return _mapper.Map<CategoryDTO>(categoryEntity);
        }

        public async Task<CategoryDTO> UpdateCategory(CategoryDTO updatedCategory)
        {
            var categoryEntity = await _unitOfWork.Categories.Get(updatedCategory.Id);
            if (categoryEntity == null)
            {
                throw new Exception("Category not found");
            }

            categoryEntity.Name = updatedCategory.Name;
            _unitOfWork.Categories.Update(categoryEntity);
            await _unitOfWork.CommitChanges();
            return _mapper.Map<CategoryDTO>(categoryEntity);
        }

        public async Task DeleteCategory(Guid id)
        {
            await _unitOfWork.Categories.Delete(id);
            await _unitOfWork.CommitChanges();
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}
