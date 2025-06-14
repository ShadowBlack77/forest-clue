using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public ActionResult Load()
        {
            return Ok();
        }

        [Authorize]
        [HttpPut("add-product")]
        public ActionResult AddProduct()
        {
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
