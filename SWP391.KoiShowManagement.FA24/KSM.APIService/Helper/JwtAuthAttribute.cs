using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KSM.APIService.Helper
{
    [AttributeUsage(AttributeTargets.Method)]
    public class JwtAllowAccessAttribute : Attribute
    {
    }
    public class JwtAuthAttribute : Attribute, IAsyncActionFilter
    {
        public string? Role { get; set; }
        public JwtAuthAttribute(string? role)
        {
            Role = role;
        }
        public JwtAuthAttribute()
        {
            Role = null;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var hasAllowAccess = context.ActionDescriptor.EndpointMetadata
                .Any(meta => meta is JwtAllowAccessAttribute);

            if (hasAllowAccess)
            {
                await next();
                return;
            }

            var authorizationHeader = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (authorizationHeader == null || !authorizationHeader.StartsWith("Bearer "))
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            if (Role == null)
            {
                return;
            }
            var token = authorizationHeader.Substring("Bearer ".Length);

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);

                var claimsIdentity = new ClaimsIdentity(jwtToken.Claims, "jwt");
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                var userRole = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
                if (userRole == null || userRole != Role)
                {
                    context.Result = new ForbidResult();
                    return;
                }

                context.HttpContext.User = claimsPrincipal;


                await next();
            }
            catch (Exception)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }

    }
}