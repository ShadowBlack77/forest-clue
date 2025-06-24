using ForestClue.Domain.Dtos;

namespace ForestClue.Application.Abstractions
{
    public interface IStripeProcessor
    {
        string CreateCheckoutSession(List<CartItemDto> cartItems);
        Task CheckoutSessionAsync(Guid userId, string sessionId);
    }
}
