namespace ForestClue.Domain.Dtos
{
    public class CartDto
    {
        public List<CartItemDto> Items { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalQuantity { get; set; }
        public string Currency {  get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
