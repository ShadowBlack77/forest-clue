using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using System.Security.Claims;

namespace ForestClue.Application.Services
{
    public class OrderService(IOrdersRepository ordersRepository, IAuthTokenProcessor authTokenProcessor) : IOrderService
    {
        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await ordersRepository.GetAllOrdersAsync();
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync()
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            return await ordersRepository.GetAllUserOrdersAsync(userId);
        }
    }
}
