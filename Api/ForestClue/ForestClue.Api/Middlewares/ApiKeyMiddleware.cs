using ForestClue.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace ForestClue.Api.Middlewares
{
    public class ApiKeyMiddleware(RequestDelegate next, IOptions<ApiKeyOptions> options)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api") && !context.Request.Path.ToString().Contains("google"))
            {
                if (!context.Request.Headers.TryGetValue(options.Value.HeaderName, out var extractedApiKey) ||
                    extractedApiKey != options.Value.Key)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Api Key is invalid");
                    return;
                }
            }

            await next(context);
        }
    }
}
