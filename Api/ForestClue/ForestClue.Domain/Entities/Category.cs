namespace ForestClue.Domain.Entities
{
    public class Category
    {
        public required long Id { get; set; }
        public required string Name { get; set; }
        public ICollection<Product> Products { get; init; } = new List<Product>();
    }
}
