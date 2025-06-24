namespace ForestClue.Infrastructure.Options
{
    public class StripeOptions
    {
        public const string StripeOptionsKey = "StripeOptions";

        public string SecretKey { get; set; }
        public string PublishableKey { get; set; }
    }
}
