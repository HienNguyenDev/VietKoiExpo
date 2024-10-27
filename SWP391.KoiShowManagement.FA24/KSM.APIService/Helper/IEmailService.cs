namespace KSM.APIService.Helper
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
