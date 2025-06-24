namespace ForestClue.Domain.Requests
{
    public class UpdateCartRequest
    {
        public long Id { get; set; }
        public required string Type { get; set; }
    }
}
