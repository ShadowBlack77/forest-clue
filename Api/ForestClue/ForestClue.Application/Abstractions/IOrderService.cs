using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrdersAsync();
        Task<List<Order>> GetOrdersByUserIdAsync();
    }
}
