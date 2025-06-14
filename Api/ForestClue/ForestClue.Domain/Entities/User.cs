using Microsoft.AspNetCore.Identity;

namespace ForestClue.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiresAtUtc { get; set; }

        public static User Create(string email, string username)
        {
            return new User
            {
                Email = email,
                UserName = username,
            };
        }
    }
}
