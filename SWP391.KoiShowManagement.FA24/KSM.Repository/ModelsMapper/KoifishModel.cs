using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class KoifishModel
    {
        public string KoiId { get; set; } = null!;

        public string VarietyId { get; set; }

        public string UserId { get; set; }

        public string ResultId { get; set; }

        public string KoiName { get; set; }

        public int? Size { get; set; }

        public int? Age { get; set; }
    }
}
