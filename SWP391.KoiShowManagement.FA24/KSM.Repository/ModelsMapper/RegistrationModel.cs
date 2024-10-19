using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class RegistrationModel
    {
        public string RegistrationId { get; set; }

        public string KoiId { get; set; }

        public string CompId { get; set; }

        public int? Status { get; set; }
    }
}
