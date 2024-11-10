using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ViewModels
{
    public class LoginResponse
    {
        public LoginResponse()
        {
            Token = string.Empty;
            responseMsg =
            new HttpResponseMessage()
            {
                StatusCode =
               System.Net.HttpStatusCode.Unauthorized
            };
        }

        public string Token { get; set; }
        public HttpResponseMessage responseMsg
        {
            get; set;
        }

    }
}
