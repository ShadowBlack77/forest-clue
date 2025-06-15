using ForestClue.Domain.Dtos;
using ForestClue.Domain.Requests;
using System.Security.Claims;

namespace ForestClue.Application.Abstractions
{
    public interface IAccountService
    {
        Task LoginAsync(LoginRequest loginRequest);
        Task RegisterAsync(RegisterRequest registerRequest);
        Task RefreshTokenAsync(string? refreshToken);
        Task LogoutAsync();
        Task LoginWithGoogleAsync(ClaimsPrincipal claimsPrincipal);
        Task<UserProfileDto> GetProfileAsync();
        Task SendResetPasswordLinkAsync(string email);
        Task NewPasswordAsync(string email, string token, string newPassword);
    }
}
