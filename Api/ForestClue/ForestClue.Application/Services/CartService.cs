using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ForestClue.Application.Services
{
    public class CartService(ICartRepository cartRepository, IAuthTokenProcessor authTokenProcessor) : ICartService
    {
        public Task AddToCartAsync(long productId)
        {
            throw new NotImplementedException();
        }

        public async Task CreateCartAsync(Cart cart)
        {
            await cartRepository.CreateCartAsync(cart);
        }

        public async Task<Cart?> LoadCartAsync()
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            return await cartRepository.GetCartByUserIdAsync(userId);
        }

        public Task UpdateCartAsync()
        {
            throw new NotImplementedException();
        }
    }
}
