using ForestClue.Application.Abstractions;
using ForestClue.Domain.Dtos;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(ICartService cartService) : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Load()
        {
            var cart = await cartService.LoadCartAsync();

            var cartDto = new CartDto
            {
                TotalPrice = cart.TotalPrice,
                TotalQuantity = cart.TotalQuantity,
                Currency = cart.Currency,
                UpdatedAt = DateTime.UtcNow,
                Items = cart.Items.Select(i => new CartItemDto
                { 
                    Id = i.ProductId,
                    Name = i.Product.Name,
                    Description = i.Product.Description,
                    Price = i.Product.Price,
                    InStock = i.Product.InStock,
                    ImageUrl = i.Product.ImageUrl,
                    Featured = i.Product.Featured,
                    Quantity = i.Quantity
                }).ToList()
            };

            return Ok(cartDto);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> SaveCartItems([FromBody] SaveCartItemsRequest saveCartItemsRequest)
        {
            await cartService.SaveCartItemsAsync(saveCartItemsRequest.CartItems);

            return Ok();
        }

        [Authorize]
        [HttpPut("add-product")]
        public async Task<ActionResult> AddProduct([FromBody] CartItemRequest cartItemRequest)
        {
            await cartService.AddToCartAsync(cartItemRequest.ProductId);

            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveProduct([FromRoute] long id)
        {
            await cartService.DeleteCartItemAsync(id);

            return Ok();
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> UpdateProductQuantity([FromBody] UpdateCartRequest updateCartRequest)
        {
            await cartService.UpdateCartQuantityAsync(updateCartRequest.Id, updateCartRequest.Type);

            return Ok();
        }
    }
}
