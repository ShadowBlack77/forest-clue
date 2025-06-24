using ForestClue.Application.Abstractions;
using ForestClue.Domain.Dtos;
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

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.TotalPrice = cart.Items.Sum(i => i.Quantity * i.Product.Price);

            cart.UpdateAt = DateTime.UtcNow;
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task CreateCartAsync(Cart cart)
        {
            applicationDbContext.Add(cart);
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task DeleteCartItemAsync(Guid userId, long id)
        {
            var cart = await applicationDbContext.Cart
                .Include(x => x.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (cart is null)
            {
                throw new Exception("Cart not found");
            }

            var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == id);

            if (cartItem == null)
            {
                throw new Exception("Item not found in cart");
            }

            cart.Items.Remove(cartItem);

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.TotalPrice = cart.Items.Sum(i => i.Product.Price * i.Quantity);
            cart.UpdateAt = DateTime.UtcNow;

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

        public async Task SaveCartItemsAsync(Guid userId, List<CartItemDto> cartItems)
        {
            var cart = await applicationDbContext.Cart
                .Include(x => x.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart is null)
            {
                throw new Exception("Cart not found");
            }

            foreach (var item in cartItems)
            {
                var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == item.Id);

                if (existingItem != null)
                {
                    existingItem.Quantity += item.Quantity;
                }
                else
                {
                    var product = await applicationDbContext.Products.FirstOrDefaultAsync(p => p.Id == item.Id);

                    if (product == null)
                    {
                        throw new Exception($"Product with Id {item.Id} not found");
                    }

                    cart.Items.Add(new CartItem
                    {
                        ProductId = product.Id,
                        Product = product,
                        Quantity = item.Quantity
                    });
                }
            }

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.TotalPrice = cart.Items.Sum(i => i.Quantity * i.Product.Price);
            cart.UpdateAt = DateTime.UtcNow;

            await applicationDbContext.SaveChangesAsync();
        }

        public async Task UpdateCartQuantityAsync(Guid userId, long id, string type)
        {
            var cart = await applicationDbContext.Cart
                .Include(x => x.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart is null)
            {
                throw new Exception("Cart not found");
            }

            var cartItem = cart.Items.FirstOrDefault(i => i.ProductId == id);

            if (cartItem == null)
            {
                throw new Exception("Item not found in cart");
            }

            if (type == "increase")
            {
                cartItem.Quantity += 1;
            }
            else if (type == "decrease")
            {
                cartItem.Quantity -= 1;

                if (cartItem.Quantity <= 0)
                {
                    cart.Items.Remove(cartItem);
                }
            }
            else
            {
                throw new ArgumentException("Invalid type value");
            }

            cart.TotalQuantity = cart.Items.Sum(i => i.Quantity);
            cart.TotalPrice = cart.Items.Sum(i => i.Product.Price * i.Quantity);
            cart.UpdateAt = DateTime.UtcNow;

            await applicationDbContext.SaveChangesAsync();
        }
    }
}
