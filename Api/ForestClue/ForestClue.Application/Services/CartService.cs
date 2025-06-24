using ForestClue.Application.Abstractions;
using ForestClue.Domain.Dtos;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ForestClue.Application.Services
{
    public class CartService(ICartRepository cartRepository, IProductRepository productRepository, IAuthTokenProcessor authTokenProcessor) : ICartService
    {
        public async Task AddToCartAsync(long productId)
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            await cartRepository.AddItemToCartAsync(userId, productId);
        }

        public async Task CreateCartAsync(Cart cart)
        {
            await cartRepository.CreateCartAsync(cart);
        }

        public async Task DeleteCartItemAsync(long id)
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            await cartRepository.DeleteCartItemAsync(userId, id);
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

        public async Task SaveCartItemsAsync(List<CartItemDto> cartItems)
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            await cartRepository.SaveCartItemsAsync(userId, cartItems);
        }

        public async Task UpdateCartQuantityAsync(long id, string type)
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            await cartRepository.UpdateCartQuantityAsync(userId, id, type);
        }
    }
}
