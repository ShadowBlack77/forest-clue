using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [Authorize(Roles = "Manager")]
        [HttpGet]
        public ActionResult GetAll()
        {
            return Ok("All Orders only for Manager");
        }

        [Authorize]
        [HttpGet("user")]
        public ActionResult GetByUser()
        {
            return Ok("Get orders via user");
        }
    }
}
