using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class ScoreModel
    {
        public Guid? KoiId { get; set; }

        public Guid? CompId { get; set; }

        public Guid? UserId { get; set; }

        public double? ScoreShape { get; set; }

        public double? ScoreColor { get; set; }

        public double? ScorePattern { get; set; }

       

        public bool? Status { get; set; }
    }
}
