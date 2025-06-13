using System.ComponentModel.DataAnnotations.Schema;

namespace ForestClue.Domain.Entities
{
    public class Product
    {
        public long Id { get; init; }
        public required string Name { get; init; }
        public required string Description { get; init; }
        public required decimal Price { get; init; }
        public int InStock { get; init; }
        public required string ImageUrl { get; init; }
        public long CategoryId { get; init; }
        public bool Featured { get; init; }
        public required Category Category { get; init; }
    }
}
