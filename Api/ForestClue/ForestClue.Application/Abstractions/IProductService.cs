using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IProductService
    {
        Task<List<Product>> GetAllAsync();
        Task GetFeatured();
        Task GetProductsCount();
        Task GetCategories();
    }
}
