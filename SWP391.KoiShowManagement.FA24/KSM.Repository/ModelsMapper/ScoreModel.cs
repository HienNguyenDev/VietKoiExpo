using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class ScoreModel
    {
        public string ScoreId { get; set; }

        public string KoiId { get; set; }

        public string CompId { get; set; }

        public string UserId { get; set; }

        public double? ScoreShape { get; set; }

        public double? ScoreColor { get; set; }

        public double? ScorePattern { get; set; }

        public double? TotalScore { get; set; }
    }
}
