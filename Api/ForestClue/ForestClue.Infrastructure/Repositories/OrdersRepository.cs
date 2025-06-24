using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ForestClue.Infrastructure.Repositories
{
    public class OrdersRepository(ApplicationDbContext applicationDbContext) : IOrdersRepository
    {
        public async Task CreateOrderAsync(Order order)
        {
            applicationDbContext.Order.Add(order);

            await applicationDbContext.SaveChangesAsync();
        }

        public async Task<List<Order?>> GetAllOrdersAsync()
        {
            return await applicationDbContext.Order.ToListAsync();
        }

        public async Task<List<Order?>> GetAllUserOrdersAsync(Guid userId)
        {
            return await applicationDbContext.Order.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Order?> GetOrderBySessionIdAsync(string sessionid)
        {
            return await applicationDbContext.Order.FirstOrDefaultAsync(x => x.SessionId == sessionid);
        }

        public async Task<Order?> GetOrderByUserIdAsync(Guid userId)
        {
            return await applicationDbContext.Order.FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }
}
