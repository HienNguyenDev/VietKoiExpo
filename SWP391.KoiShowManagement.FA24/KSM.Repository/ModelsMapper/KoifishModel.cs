using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class KoifishModel
    {
        public string VarietyId { get; set; }

        public Guid? UserId { get; set; }

        public string KoiName { get; set; }

        public int? Size { get; set; }

        public DateOnly? BirthDate { get; set; }

        public int? Age { get; set; }

        public string ImageUrl { get; set; }

        public bool? Status { get; set; }
    }
}
