using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllAsync();
    }
}
