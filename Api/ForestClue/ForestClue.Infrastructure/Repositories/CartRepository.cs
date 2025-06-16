using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ForestClue.Infrastructure.Repositories
{
    public class CartRepository(ApplicationDbContext applicationDbContext) : ICartRepository
    {
        public async Task AddItemToCartAsync(Guid userId, long productId)
        {
            var cart = await applicationDbContext.Cart
                    .Include(c => c.Items)
                    .ThenInclude(i => i.Product)
                    .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                throw new InvalidOperationException("Cart not found");
            }

            var product = await applicationDbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
            {
                throw new ArgumentException("Product not found");
            }

            var existingItem = cart.Items.FirstOrDefault(i => i.Product.Id == productId);

            if (existingItem != null)
            {
                existingItem.Quantity += 1;
            }
            else
            {
                applicationDbContext.CartItems.Add(new CartItem
                {
                    Id = Guid.NewGuid(),
                    Product = product,
                    Quantity = 1,
                    Cart = cart,
                });
            }

            cart.UpdateAt = DateTime.UtcNow;
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task CreateCartAsync(Cart cart)
        {
            applicationDbContext.Add(cart);
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task<Cart?> GetCartByUserIdAsync(Guid userId)
        {
            var cart = await applicationDbContext.Cart
                .Include(x => x.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            return cart;
        }
    }
}
