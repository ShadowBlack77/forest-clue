using ForestClue.Domain.Dtos;

namespace ForestClue.Application.Abstractions
{
    public interface IStripeService 
    {
        string CreateCheckoutSession(List<CartItemDto> cartItems);
        Task CheckoutSessionAsync(string sessionId);
    }
}
