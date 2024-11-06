using KSM.Repository.Models;
using KSM.Repository.ViewModels;

namespace KSM.APIService.Payment
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(TblregistrationPayment model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
