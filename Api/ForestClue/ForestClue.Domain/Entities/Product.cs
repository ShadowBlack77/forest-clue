using System.ComponentModel.DataAnnotations.Schema;

namespace ForestClue.Domain.Entities
{
    public class Product
    {
        public required long Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required double Price { get; set; }
        public int InStock { get; set; }
        public required string ImageUrl { get; set; }
        public required string Category { get; set; }
        public bool Featured { get; set; }
    }
}
