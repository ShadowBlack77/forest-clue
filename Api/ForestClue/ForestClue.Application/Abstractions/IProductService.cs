using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IProductService
    {
        Task<List<Product>> GetAllAsync();
        Task<List<Product>> GetFeaturedAsync();
        Task<int> GetProductsCount();
        Task<int> GetProductsCategoryCountAsync(string category);
    }
}
