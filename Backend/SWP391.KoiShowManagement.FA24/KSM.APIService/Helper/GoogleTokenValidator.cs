using Google.Apis.Auth;
using KSM.Repository.ViewModels;

namespace KSM.APIService.Helper
{
    public class GoogleTokenValidator
    {
        private readonly string _clientId;

        public GoogleTokenValidator(IConfiguration configuration)
        {
            _clientId = configuration["Google:ClientId"]; // Cấu hình Client ID của ứng dụng
        }

        public async Task<GoogleJsonWebSignature.Payload> ValidateAsync(string token)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _clientId }
            };

            // Xác thực token với Google
            var payload = await GoogleJsonWebSignature.ValidateAsync(token, settings);

            return payload; // Trả về thông tin người dùng sau khi xác thực thành công
        }
    }
}
