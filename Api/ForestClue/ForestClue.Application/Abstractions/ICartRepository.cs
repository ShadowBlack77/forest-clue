using ForestClue.Domain.Dtos;
using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface ICartRepository
    {
        Task<Cart?> GetCartByUserIdAsync(Guid userId);
        Task CreateCartAsync(Cart cart);
        Task AddItemToCartAsync(Guid userId, long productId);
        Task UpdateCartQuantityAsync(Guid userId, long id, string type);
        Task DeleteCartItemAsync(Guid userId, long id);
        Task SaveCartItemsAsync(Guid userId, List<CartItemDto> cartItems);
    }
}
