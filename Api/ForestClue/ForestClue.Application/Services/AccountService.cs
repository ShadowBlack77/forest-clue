﻿using ForestClue.Application.Abstractions;
using ForestClue.Domain.Constants;
using ForestClue.Domain.Dtos;
using ForestClue.Domain.Entities;
using ForestClue.Domain.Enums;
using ForestClue.Domain.Exceptions;
using ForestClue.Domain.Requests;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Web;

namespace ForestClue.Application.Services
{
    public class AccountService(IAuthTokenProcessor authTokenProcessor, UserManager<User> userManager, IUserRepository userRepository, IEmailProcessor emailProcessor, ICartService cartService) : IAccountService
    {
        public async Task LoginAsync(LoginRequest loginRequest)
        {
            var user = await userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                throw new LoginFailedException();
            }

            IList<string> roles = await userManager.GetRolesAsync(user);

            var (jwtToken, expirationDateInUtc) = authTokenProcessor.GenerateJwtToken(user, roles);
            var refreshTokenValue = authTokenProcessor.GenerateRefreshToken();

            var refreshTokenExpirationDateInUtc = DateTime.UtcNow.AddDays(7);

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUtc = refreshTokenExpirationDateInUtc;

            await userManager.UpdateAsync(user);

            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
        }

        public async Task RegisterAsync(RegisterRequest registerRequest)
        {
            var userExists = await userManager.FindByEmailAsync(registerRequest.Email) != null;

            if (userExists)
            {
                throw new UserAlreadyExistsException(registerRequest.Email);
            }

            Console.WriteLine($"Username: '{registerRequest.Username}'");

            var user = User.Create(
               registerRequest.Email,
                registerRequest.Username
            );

            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, registerRequest.Password);

            var result = await userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                throw new RegistrationFailedException(result.Errors.Select(x => x.Description));
            }

            await userManager.AddToRoleAsync(user, GetIdentityRoleName(Role.User));

            var cart = new Cart
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Currency = "USD",
                UpdateAt = DateTime.UtcNow,
                TotalPrice = 0,
                TotalQuantity = 0
            };

            await cartService.CreateCartAsync(cart);
        }

        public async Task LogoutAsync()
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in.");
            }

            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found.");
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiresAtUtc = null;

            await userManager.UpdateAsync(user);

            authTokenProcessor.RemoveAuthTokenCookie("ACCESS_TOKEN");
            authTokenProcessor.RemoveAuthTokenCookie("REFRESH_TOKEN");
        }

        public async Task RefreshTokenAsync(string? refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new RefreshTokenException("Refresh token is missing");
            }

            var user = await userRepository.GetUserByRefreshTokenAsync(refreshToken);

            if (user == null)
            {
                throw new RefreshTokenException("Unable to retrive user for refresh token");
            }

            if (user.RefreshTokenExpiresAtUtc < DateTime.UtcNow)
            {
                throw new RefreshTokenException("Refresh token is expired.");
            }

            IList<string> roles = await userManager.GetRolesAsync(user);

            var (jwtToken, expirationDateInUtc) = authTokenProcessor.GenerateJwtToken(user, roles);
            var refreshTokenValue = authTokenProcessor.GenerateRefreshToken();

            var refreshTokenExpirationDateInUtc = DateTime.UtcNow.AddDays(7);

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUtc = refreshTokenExpirationDateInUtc;

            await userManager.UpdateAsync(user);

            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
        }

        public async Task LoginWithGoogleAsync(ClaimsPrincipal claimsPrincipal)
        {
            if (claimsPrincipal == null)
            {
                throw new ExternalLoginProviderException("Google", "ClaimsPrincipal is null");
            }

            var email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);
            var googleId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (email == null)
            {
                throw new ExternalLoginProviderException("Google", "Email is null");
            }

            if (googleId == null)
            {
                throw new ExternalLoginProviderException("Google", "Google ID (NameIdentifier) is null");
            }

            // Sprawdź, czy login Google już istnieje
            var existingLoginUser = await userManager.FindByLoginAsync("Google", googleId);
            User user;

            if (existingLoginUser != null)
            {
                user = existingLoginUser;
            }
            else
            {
                // Jeśli nie znaleziono loginu, spróbuj znaleźć użytkownika po e-mailu
                user = await userManager.FindByEmailAsync(email);

                if (user == null)
                {
                    // Tworzenie nowego użytkownika
                    var newUser = new User
                    {
                        UserName = email,
                        Email = email,
                        EmailConfirmed = true
                    };

                    var result = await userManager.CreateAsync(newUser);

                    if (!result.Succeeded)
                    {
                        throw new ExternalLoginProviderException("Google", $"Unable to create user: {string.Join(", ", result.Errors.Select(x => x.Description))}");
                    }

                    user = newUser;
                }

                // Dodaj login Google
                var info = new UserLoginInfo("Google", googleId, "Google");
                var loginResult = await userManager.AddLoginAsync(user, info);

                if (!loginResult.Succeeded)
                {
                    throw new ExternalLoginProviderException("Google", $"Unable to add login: {string.Join(", ", loginResult.Errors.Select(x => x.Description))}");
                }
            }

            // Generuj tokeny
            IList<string> roles = await userManager.GetRolesAsync(user);

            var (jwtToken, expirationDateInUtc) = authTokenProcessor.GenerateJwtToken(user, roles);
            var refreshTokenValue = authTokenProcessor.GenerateRefreshToken();
            var refreshTokenExpirationDateInUtc = DateTime.UtcNow.AddDays(7);

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUtc = refreshTokenExpirationDateInUtc;

            await userManager.UpdateAsync(user);

            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
        }


        public async Task<UserProfileDto> GetProfileAsync()
        {
            var claimsPrincipal = authTokenProcessor.GetClaimsPrincipal();

            if (claimsPrincipal == null || !Guid.TryParse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value, out Guid userId))
            {
                throw new UnauthorizedAccessException("User is not logged in");
            }

            var user = await userRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                throw new UnauthorizedAccessException("User not found");
            }

            var roles = await userManager.GetRolesAsync(user);

            var userProfile = new UserProfileDto
            {
                Email = user.Email,
                Username = user.UserName,
                Role = roles.FirstOrDefault()
            };

            return userProfile;
        }

        public async Task SendResetPasswordLinkAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new Exception("Invalid request");
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);

            emailProcessor.SendEmail(email, "Reset Password", $"https://localhost:7147/auth/account/reset-password?token={encodedToken}&email={email}");
        }

        public async Task NewPasswordAsync(string email, string token, string newPassword)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new Exception("Invalid request");
            }

            await userManager.ResetPasswordAsync(user, token, newPassword);
        }

        private string GetIdentityRoleName(Role role)
        {
            return role switch
            {
                Role.User => IdentityRoleConstants.User,
                Role.Manager => IdentityRoleConstants.Manager,
                _ => throw new ArgumentOutOfRangeException(nameof(role), role, "Provided role is not supported")
            };
        }
    }
}
