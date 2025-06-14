using ForestClue.Application.Abstractions;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController(IContactService contactService) : ControllerBase
    {
        [HttpPost]
        public ActionResult SendMessage([FromBody] EmailRequest emailRequest)
        {
            contactService.SendEmail(emailRequest);

            return Ok();
        }
    }
}
