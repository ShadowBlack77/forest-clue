using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
    }
}
