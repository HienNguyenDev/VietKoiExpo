using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ViewModels
{
    public class LoginRequest
    {
        public LoginRequest()
        {
            Email = string.Empty;
            Password = string.Empty;
        }
        public string? Email { get; set; }
        public string Password { get; set; }
    }
}
