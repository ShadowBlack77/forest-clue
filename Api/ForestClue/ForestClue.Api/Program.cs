using ForestClue.Api.Handlers;
using ForestClue.Api.Middlewares;
using ForestClue.Application.Abstractions;
using ForestClue.Application.Services;
using ForestClue.Domain.Entities;
using ForestClue.Infrastructure;
using ForestClue.Infrastructure.Options;
using ForestClue.Infrastructure.Processors;
using ForestClue.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsConfig", options =>
    {
        options.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection(JwtOptions.JwtOptionsKey));
builder.Services.Configure<EmailOptions>(
    builder.Configuration.GetSection(EmailOptions.EmailOptionsKey));
builder.Services.Configure<StripeOptions>(
    builder.Configuration.GetSection(StripeOptions.StripeOptionsKey));
builder.Services.Configure<ApiKeyOptions>(
    builder.Configuration.GetSection(ApiKeyOptions.AuthenticationApiKey));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("LocalDatabaseConnection"));
});

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;

    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
    options.TokenLifespan = TimeSpan.FromMinutes(5)
);

builder.Services.AddScoped<IEmailProcessor, EmailProcessor>();
builder.Services.AddScoped<IAuthTokenProcessor, AuthTokenProcessor>();
builder.Services.AddScoped<IStripeProcessor, StripeProcessor>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IStripeService, StripeService>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddCookie().AddGoogle(options =>
{
    var clientId = builder.Configuration["Authentication:Google:ClientId"];

    if (clientId == null)
    {
        throw new ArgumentNullException(nameof(clientId));
    }

    var clientSecret = builder.Configuration["Authentication:Google:ClientSecret"];

    if (clientSecret == null)
    {
        throw new ArgumentNullException(nameof(clientSecret));
    }

    options.ClientId = clientId;
    options.ClientSecret = clientSecret;
    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var jwtOptions = builder.Configuration.GetSection(JwtOptions.JwtOptionsKey)
        .Get<JwtOptions>() ?? throw new ArgumentException(nameof(JwtOptions));

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret))
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["ACCESS_TOKEN"];

            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthentication();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsConfig");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler(_ => { });
app.UseHttpsRedirection();
app.UseMiddleware<ApiKeyMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
