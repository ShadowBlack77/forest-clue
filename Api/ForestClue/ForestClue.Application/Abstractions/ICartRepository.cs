using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface ICartRepository
    {
        Task<Cart?> GetCartByUserIdAsync(Guid userId);
        Task CreateCartAsync(Cart cart);
        Task AddItemToCartAsync(Guid userId, long productId);
    }
}
