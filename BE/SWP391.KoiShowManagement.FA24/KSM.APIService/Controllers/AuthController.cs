using KSM.Repository.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using KSM.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using KSM.Repository.ViewModels;
using KSM.Repository.Repositories.UserRepository;
using KSM.APIService.Helper;
using KSM.Repository.ViewModels;
using Microsoft.AspNetCore.Authentication;
using static KSM.APIService.Controllers.UserController;
using Microsoft.AspNetCore.Authentication.Google;
namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public AuthController(IConfiguration configuration, IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(Repository.ViewModels.LoginRequest login)
        {
            var loginResponse = new LoginResponse { };
            Repository.ViewModels.LoginRequest loginrequest = new()
            {
                UserName = login.UserName.ToLower(),
                Email = login.Email,
                Password = login.Password
            };

            if (login == null)
            {
                return BadRequest("No User!");
            }
                Tbluser user = await _userRepository.GetUserByUsernameAsync(login.UserName);
                if (user == null)
                {
                    return BadRequest("Username or Password Invalid!");
                } 
                if (user.Password != login.Password)
                {
                    return BadRequest("Username or Password Invalid!");
                }
            // if credentials are valid
                string token = JwtHelper.CreateToken(user, _configuration);
                loginResponse.Token = token;
                loginResponse.responseMsg = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                //return the token
                return Ok(new { loginResponse });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(Register registerUser)
        {
            // Check if username or email already exists
            var existingUserByUsername = await _userRepository.GetUserByUsernameAsync(registerUser.Username);

            if (existingUserByUsername != null)
            {
                return BadRequest("Username is already taken.");
            }


            // Create a new user entity
            try
            {
                var newUser = new Tbluser
                {
                    UserId = registerUser.Username,
                    Email = registerUser.Email,
                    Password = registerUser.Password,
                    RoleId = registerUser.Role
                };
            
            // Add user to the database
            await _userRepository.CreateAsync(newUser);

            // Generate JWT token for the new user
            var token = Helper.JwtHelper.CreateToken(newUser, _configuration); 

            return Ok(new { token });

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse")
            };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync("External");

            if (result?.Principal == null)
                return Unauthorized();

            var claims = result.Principal.Identities.FirstOrDefault()?.Claims;
            var email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (email == null)
            return Unauthorized();

            Tbluser user = await _userRepository.GetByEmail(email);
            if (user == null)
            {
                user = new Tbluser { Email = email };
                await _userRepository.CreateAsync(user);
            }
            // Check if the user exists in the database         

            // Generate a JWT token
            var token = Helper.JwtHelper.CreateToken(user, _configuration);

            return Ok(new { token });
        }
    }
}
