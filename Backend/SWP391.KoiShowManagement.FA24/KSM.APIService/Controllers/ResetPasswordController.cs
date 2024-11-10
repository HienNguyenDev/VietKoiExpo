using KSM.APIService.Helper;
using KSM.Repository.Repositories.UserRepository;
using KSM.Repository.ViewModels;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace KSM.APIService.Controllers
{
    public class ResetPasswordController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public ResetPasswordController(IConfiguration configuration, IUserRepository userRepository, IEmailService emailService)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _emailService = emailService;
        }

        [HttpPost("Forgot-Password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassRequest request)
        {
            var user = await _userRepository.GetByEmail(request.Email);
            if (user == null)
            {
                return NotFound("Email not found!");
            }

            // Tạo JWT token để đặt lại mật khẩu
            var resetToken = JwtHelper.CreateToken(user, _configuration);

            // Đường dẫn đến trang đặt lại mật khẩu (trên client ReactJS)
            var resetLink = $"http://localhost:3000/reset-password/{resetToken}";
            string subject = "[VietKoiExpo] Reset Password";
            var body = $"Click in this link to reset your password: {resetLink}";

            // Gửi email đặt lại mật khẩu
            await _emailService.SendEmailAsync(user.Email, subject, body);

            return Ok("Please check your email!");  
        }

        [HttpPost("Reset-Password")]
        public async Task<IActionResult> ResetPassword([FromQuery] string token, [FromBody] ResetPassRequest request)
        {
            var email = JwtHelper.ValidateResetPasswordToken(token, _configuration);
            if (email == null)
            {
                return BadRequest("The token is invalid");
            }

            var user = await _userRepository.GetByEmail(email);
            if (user == null)
            {
                return NotFound("User not found!");
            }

            // Đặt lại mật khẩu
            user.Password = request.NewPassword;
            await _userRepository.UpdateAsync(user);

            return Ok("Your password has changed successfully!");
        }
    }
}
