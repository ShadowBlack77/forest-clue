using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;

namespace ForestClue.Application.Services
{
    public class ProductService(IProductRepository productRepository) : IProductService
    {
        public async Task<List<Product>> GetAllAsync()
        {
            return await productRepository.GetAllAsync();
        }

        public Task GetCategories()
        {
            throw new NotImplementedException();
        }

        public Task GetFeatured()
        {
            throw new NotImplementedException();
        }

        public Task GetProductsCount()
        {
            throw new NotImplementedException();
        }
    }
}
