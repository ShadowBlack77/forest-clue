using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;

namespace ForestClue.Application.Services
{
    public class CategoryService(ICategoryRepository categoryRepository) : ICategoryService
    {
        public async Task<List<Category>> GetAllAsync()
        {
            return await categoryRepository.GetAllAsync();
        }
    }
}
