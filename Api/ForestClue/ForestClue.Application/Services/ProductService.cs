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

        public async Task<List<Product>> GetFeaturedAsync()
        {
            List<Product> products = await productRepository.GetAllAsync();

            products = products.Where(x => x.Featured).ToList();

            return products;
        }

        public async Task<int> GetProductsCount()
        {
            List<Product> products = await productRepository.GetAllAsync();

            return products.Count;
        }

        public async Task<int> GetProductsCategoryCountAsync(string category)
        {
            List<Product> products = await productRepository.GetAllAsync();

            products = products.Where(p => p.Category.Name == category).ToList();

            return products.Count;
        }
    }
}
