namespace ForestClue.Domain.Dtos
{
    public class CartItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int InStock { get; set; }
        public string ImageUrl { get; set; }
        public bool Featured { get; set; }
        public int Quantity { get; set; }
    }
}
