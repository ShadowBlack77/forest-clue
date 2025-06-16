using System.Text.Json.Serialization;

namespace ForestClue.Domain.Entities
{
    public class Cart
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
        public decimal TotalPrice { get; set; }
        public int TotalQuantity { get; set; }
        public string Currency { get; set; } = "USD";
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}
