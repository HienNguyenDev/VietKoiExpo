using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class RegistrationModel
    {
        public Guid? KoiId { get; set; }

        public Guid? CompId { get; set; }

        public int? Status { get; set; }
    }
}
