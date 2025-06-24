using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IOrdersRepository
    {
        Task<List<Order?>> GetAllOrdersAsync();
        Task<List<Order?>> GetAllUserOrdersAsync(Guid userId);
        Task<Order?> GetOrderByUserIdAsync(Guid userId);
        Task<Order?> GetOrderBySessionIdAsync(string sessionid);
        Task CreateOrderAsync(Order order);
    }
}
