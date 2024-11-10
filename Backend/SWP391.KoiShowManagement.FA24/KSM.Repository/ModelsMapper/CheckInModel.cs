using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class CheckInModel
    {
        public string ImageUrl { get; set; }

        public int? Status { get; set; }

        public Guid? RegistrationId { get; set; }
        public string Description { get; set; }
    }
}
