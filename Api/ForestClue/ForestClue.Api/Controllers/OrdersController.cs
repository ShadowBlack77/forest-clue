using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(IStripeService stripeService, IOrderService orderService) : ControllerBase
    {
        [Authorize(Roles = "Manager")]
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok("All Orders only for Manager");
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<List<Order>>> GetByUser()
        {
            var userOrders = await orderService.GetOrdersByUserIdAsync();

            return Ok(userOrders);
        }

        [Authorize]
        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession([FromBody] SaveCartItemsRequest saveCartItemsRequest)
        {
            string sessionId = stripeService.CreateCheckoutSession(saveCartItemsRequest.CartItems);

            return Ok(new { sessionId });
        }

        [Authorize]
        [HttpPost("checkout-session")]
        public async Task<ActionResult> CheckoutSession([FromBody] CheckoutSessionRequest checkoutSessionRequest)
        {
            await stripeService.CheckoutSessionAsync(checkoutSessionRequest.SessionId);

            return Ok();
        }
    }
}
