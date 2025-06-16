using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ForestClue.Infrastructure.Repositories
{
    public class ProductRepository(ApplicationDbContext applicationDbContext) : IProductRepository
    {
        public async Task<List<Product>> GetAllAsync()
        {
            return await applicationDbContext.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task<Product?> GetOneByIdAsync(long productId)
        {
            return await applicationDbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);
        }
    }
}
