namespace ForestClue.Infrastructure.Options
{
    public class EmailOptions
    {
        public const string EmailOptionsKey = "EmailOptions";

        public string Host {  get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
