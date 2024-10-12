using KSM.Repository.Models;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace KSM.APIService.Helper
{
    public class JwtHelper
    {
        public static string CreateToken(Tbluser user, IConfiguration _configuration)
        {

            List<Claim> claims = new()
            {
                //list of Claims - we only checking username - more claims can be added.
                new Claim(ClaimTypes.Upn, Convert.ToString(user.UserId)),
                new Claim(ClaimTypes.Role, Convert.ToString(user.RoleId))
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
