using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ForestClue.Domain.Dtos;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAccountService accountService, LinkGenerator linkGenerator, SignInManager<User> signInManager) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginRequest loginRequest)
        {
            await accountService.LoginAsync(loginRequest);

            return Ok();
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync([FromBody] RegisterRequest registerRequest)
        {
            await accountService.RegisterAsync(registerRequest);

            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<ActionResult> RefreshTokenAsync()
        {
            var refreshToken = HttpContext.Request.Cookies["REFRESH_TOKEN"];

            await accountService.RefreshTokenAsync(refreshToken);

            return Ok();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> LogoutAsync()
        {
            await accountService.LogoutAsync();

            return Ok();
        }

        [HttpGet("login/google")]
        public ActionResult LoginGoogle([FromQuery] string returnUrl)
        {
            var properties = signInManager.ConfigureExternalAuthenticationProperties("Google",
                linkGenerator.GetPathByName(HttpContext, "GoogleLoginCallback") + $"?returnUrl={returnUrl}");

            return Challenge(properties, ["Google"]);
        }

        [HttpGet("login/google/callback", Name = "GoogleLoginCallback")]
        public async Task<ActionResult> LoginGoogleCallbackAsync([FromQuery] string returnUrl)
        {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            await accountService.LoginWithGoogleAsync(result.Principal);

            return Redirect(returnUrl);
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPasswordAsync()
        {
            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> ProfileAsync()
        {
            UserProfileDto userProfile = await accountService.GetProfileAsync();

            return Ok(userProfile);
        }
    }
}
