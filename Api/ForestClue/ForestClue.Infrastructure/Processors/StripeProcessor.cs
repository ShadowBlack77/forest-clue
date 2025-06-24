using ForestClue.Application.Abstractions;
using ForestClue.Domain.Dtos;
using ForestClue.Domain.Entities;
using ForestClue.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace ForestClue.Infrastructure.Processors
{
    public class StripeProcessor(IOptions<StripeOptions> stripeOptions, IOrdersRepository ordersRepository, ICartRepository cartRepository, IEmailProcessor emailProcessor) : IStripeProcessor
    {
        public async Task CheckoutSessionAsync(Guid userId, string sessionId)
        {
            StripeConfiguration.ApiKey = stripeOptions.Value.SecretKey;

            var service = new SessionService();
            var session = service.Get(sessionId);

            if (session.PaymentStatus == "paid")
            {
                var existingOrder = await ordersRepository.GetOrderBySessionIdAsync(sessionId);

                if (existingOrder != null)
                {
                    throw new ArgumentException("Session already processed");
                }

                var cart = await cartRepository.GetCartByUserIdAsync(userId);

                var order = new Order
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    SessionId = sessionId,
                    TotalAmount = cart.Items.Sum(i => i.Quantity * i.Product.Price),
                    CreatedAt = DateTime.UtcNow,
                    Items = cart.Items.Select(item => new OrderItem
                    {
                        Id = Guid.NewGuid(),
                        ProductId = item.ProductId,
                        ProductName = item.Product.Name,
                        ProductDescription = item.Product.Description,
                        UnitPrice = item.Product.Price,
                        Quantity = item.Quantity,
                        ImageUrl = item.Product.ImageUrl
                    }).ToList()
                };

                await ordersRepository.CreateOrderAsync(order);
                await cartRepository.ClearCartAsync(userId);
            }
            else
            {
                throw new InvalidOperationException($"Cannot process unpaid session: {session.PaymentStatus}");
            }
        }

        public string CreateCheckoutSession(List<CartItemDto> cartItems)
        {
            StripeConfiguration.ApiKey = stripeOptions.Value.SecretKey;

            var lineItems = cartItems.Select(item => new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "usd",
                    UnitAmount = (long)(item.Price * 100),
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    { 
                        Name = item.Name,
                        Description = item.Description,
                        Images = new List<string> { item.ImageUrl }
                    }
                },
                Quantity = item.Quantity
            }).ToList();

            var options = new SessionCreateOptions
            {
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "http://localhost:4200/orders/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://localhost:4200/"
            };

            var service = new SessionService();

            Session session = service.Create(options);

            return session.Id;
        }
    }
}
