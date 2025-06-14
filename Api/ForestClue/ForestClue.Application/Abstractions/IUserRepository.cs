using ForestClue.Domain.Entities;

namespace ForestClue.Application.Abstractions
{
    public interface IUserRepository
    {
        Task<User?> GetUserByRefreshTokenAsync(string refreshToken);
        Task<User?> GetUserByIdAsync(Guid userId);
    }
}
