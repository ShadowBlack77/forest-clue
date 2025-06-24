using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [Authorize(Roles = "Manager")]
        [HttpGet("accounts-count")]
        public async Task<ActionResult> GetAccountCount()
        {
            return Ok();
        }
    }
}
