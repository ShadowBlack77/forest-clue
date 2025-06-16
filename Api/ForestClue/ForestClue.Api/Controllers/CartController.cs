using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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

            return Ok(cart);
        }

        [Authorize]
        [HttpPut("add-product")]
        public async Task<ActionResult> AddProduct([FromBody] CartItemRequest cartItemRequest)
        {
            await cartService.AddToCartAsync(cartItemRequest.ProductId);

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        public ActionResult RemoveProduct()
        {
            return Ok();
        }

        [Authorize]
        [HttpPut]
        public ActionResult UpdateProductQuantity()
        {
            return Ok();
        }
    }
}
