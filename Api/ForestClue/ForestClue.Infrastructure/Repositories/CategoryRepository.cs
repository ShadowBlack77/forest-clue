using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ForestClue.Infrastructure.Repositories
{
    public class CategoryRepository(ApplicationDbContext applicationDbContext) : ICategoryRepository
    {
        public async Task<List<Category>> GetAllAsync()
        {
            return await applicationDbContext.Categories.ToListAsync();
        }
    }
}
