using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ForestClue.Infrastructure.Repositories
{
    public class CartRepository(ApplicationDbContext applicationDbContext) : ICartRepository
    {
        public async Task CreateCartAsync(Cart cart)
        {
            applicationDbContext.Add(cart);
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task<Cart?> GetCartByUserIdAsync(Guid userId)
        {
            var cart = await applicationDbContext.Cart.FirstOrDefaultAsync(x => x.UserId == userId);

            return cart;
        }
    }
}
