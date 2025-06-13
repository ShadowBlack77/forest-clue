using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
    }
}
