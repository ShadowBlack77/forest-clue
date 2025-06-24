using ForestClue.Application.Abstractions;
using ForestClue.Domain.Dtos;
using System.Security.Claims;

namespace ForestClue.Application.Services
{
    public class StripeService(IStripeProcessor stripeProcessor, IAuthTokenProcessor authTokenProcessor) : IStripeService
    {
        public async Task CheckoutSessionAsync(string sessionId)
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            await stripeProcessor.CheckoutSessionAsync(userId, sessionId);
        }

        public string CreateCheckoutSession(List<CartItemDto> cartItems)
        {
            if (cartItems.Count <= 0)
            {
                throw new ArgumentException();
            }

            return stripeProcessor.CreateCheckoutSession(cartItems);
        }
    }
}
