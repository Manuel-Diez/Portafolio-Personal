using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Business.Interface;
using Data.Interface;
using Entity.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Business.Implements
{

    public class AuthBusiness : IAuthBusiness
    {
        private readonly IUserData userData;
        private readonly IConfiguration configuration;

        public AuthBusiness(IUserData userData, IConfiguration configuration)
        {
            this.userData = userData;
            this.configuration = configuration;
        }

        public async Task<AuthResponseDto?> Login(LoginDto login)
        {
            if (string.IsNullOrWhiteSpace(login.UserName) || string.IsNullOrWhiteSpace(login.Password))
            {
                return null;
            }

            var user = await userData.GetByName(login.UserName);
            if (user == null || string.IsNullOrEmpty(user.Password))
            {
                return null;
            }

            var hasher = new PasswordHasher<Entity.Model.Security.User>();
            var result = hasher.VerifyHashedPassword(user, user.Password, login.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var jwtSection = configuration.GetSection("Jwt");
            var key = jwtSection["Key"]!;
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];
            var expiresMinutes = int.Parse(jwtSection["ExpiresInMinutes"] ?? "60");
            var expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id.ToString())
            };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            return new AuthResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserName = user.UserName,
                ExpiresAt = expiresAt
            };
        }
    }
}
