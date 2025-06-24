using ForestClue.Domain.Dtos;

namespace ForestClue.Domain.Requests
{
    public class SaveCartItemsRequest
    {
        public List<CartItemDto> CartItems { get; set; }
    }
}
