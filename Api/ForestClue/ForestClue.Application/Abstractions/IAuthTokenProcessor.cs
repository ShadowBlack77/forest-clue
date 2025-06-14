using ForestClue.Domain.Entities;
using System.Security.Claims;

namespace ForestClue.Application.Abstractions
{
    public interface IAuthTokenProcessor
    {
        (string jwtToken, DateTime expiresAtUtc) GenerateJwtToken(User user, IList<string> roles);
        string GenerateRefreshToken();
        void WriteAuthTokenAsHttpOnlyCookie(string cookieName, string token, DateTime expiration);
        void RemoveAuthTokenCookie(string cookieName);
        ClaimsPrincipal GetClaimsPrincipal();
    }
}
