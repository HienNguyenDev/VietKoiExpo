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
using Google.Apis.Auth;
namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly GoogleTokenValidator _googleTokenValidator;

        public AuthController(IConfiguration configuration, IUserRepository userRepository, GoogleTokenValidator googleTokenValidator)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _googleTokenValidator = googleTokenValidator;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(Repository.ViewModels.LoginRequest login)
        {
            //Tạo LoginRequest
            var loginResponse = new LoginResponse { };
            Repository.ViewModels.LoginRequest loginrequest = new()
            {
                Email = login.Email,
                Password = login.Password
            };

            //Kiểm tra User có tồn tại không
            if (login == null)
            {
                return BadRequest("No User!");
            }
                Tbluser user = await _userRepository.GetByEmail(login.Email);
                if (user == null)
                {
                    return BadRequest("Username or Password Invalid!");
                } 
                if (user.Password != login.Password)
                {
                    return BadRequest("Username or Password Invalid!");
                }
            //User hợp lệ thì sinh ra token
                string token = JwtHelper.CreateToken(user, _configuration);
                loginResponse.Token = token;
                loginResponse.responseMsg = new HttpResponseMessage()
                {                                                           
                    StatusCode = HttpStatusCode.OK
                };
                
                //Trả về token và dữ liệu user
                return Ok(new { loginResponse, user});
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(Register registerUser)
        {
            // Check if username or email already exists
            var existingUserByUsername = await _userRepository.GetByEmail(registerUser.Email);

            if (existingUserByUsername != null)
            {
                return BadRequest("Username is already taken.");
            }


            // Create a new user entity
            try
            {
                var newUser = new Tbluser
                {
                    UserId = Guid.NewGuid(),
                    Email = registerUser.Email,
                    Password = registerUser.Password,
                    RoleId = "member",
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

        [HttpPost("Google-Validation")]
        public async Task<IActionResult> GoogleValidation([FromBody] string token)
        {       
            try
            {
                // Xác thực token của Google
                var payload = await _googleTokenValidator.ValidateAsync(token);

                // Tại đây, bạn có thể lấy thông tin từ payload để tạo tài khoản mới hoặc đăng nhập người dùng
                var userEmail = payload.Email;
                var userName = payload.Name;

                // Kiểm tra xem người dùng đã tồn tại trong database chưa
                var existingUser = await _userRepository.GetByEmail(userEmail);
                if (existingUser != null)
                {
                    string JwtToken = JwtHelper.CreateToken(existingUser, _configuration);
                    return Ok(new { JwtToken });
                }
                else
                {
                    var newUser = new Tbluser
                    {
                        UserId = Guid.NewGuid(),
                        Email = userEmail,
                        FullName = userName,
                        RoleId = "member"
                    };
                    await _userRepository.CreateAsync(newUser);
                    var JwtToken = JwtHelper.CreateToken(newUser, _configuration);
                    return Ok(new { JwtToken });
                }
            }
            catch (InvalidJwtException)
            {
                return Unauthorized("Invalid Google token.");
            }
        }
    }
}
