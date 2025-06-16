namespace ForestClue.Domain.Requests
{
    public class ProductRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int inStock { get; set; }
        public string imageUrl { get; set; }
        public bool featured { get; set; }
    }
}
