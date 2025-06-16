using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;

namespace ForestClue.Application.Abstractions
{
    public interface ICartService
    {
        Task CreateCartAsync(Cart cart);
        Task<Cart?> LoadCartAsync();
        Task AddToCartAsync(long productId);
        Task UpdateCartAsync();
    }
}
