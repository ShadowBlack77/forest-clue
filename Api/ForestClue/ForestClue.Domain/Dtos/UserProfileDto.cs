namespace ForestClue.Domain.Dtos
{
    public class UserProfileDto
    {
        public required string Email { get; set; }
        public required string Username { get; set; }
        public required string Role { get; set; }
    }
}
