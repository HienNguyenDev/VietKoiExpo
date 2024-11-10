using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.RegistrationRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.PredictRepository
{
    public class PredictRepository : GenericDbContextRepository<VietKoiExpoContext, Tblprediction, string>, IPredictRepository
    {
        public PredictRepository(VietKoiExpoContext context) : base(context)
        {

        }
        public float PredictKoiScore(string variety, int size, int age)
        {
            float score = 0;

            //1. Tính điểm dựa trên giống (variety)
            switch (variety.ToLower())
            {
                case "kohaku":
                    score += 5; 
                    break;
                case "showa":
                    score += 4; 
                    break;
                case "sanke":
                    score += 3; 
                    break;
                default:
                    score += 2; 
                    break;
            }

            // 2. Tính điểm dựa trên kích thước (size)
            if (size > 70)
                score += 3; 
            else if (size > 60)
                score += 2.5f;
            else if (size > 50)
                score += 2;
            else if (size > 30)
                score += 1.5f;
            else
                score += 1;

            // 3. Tính điểm dựa trên độ tuổi (age)
            if (age > 5)
                score += 2; 
            else if (age > 2)
                score += 1.5f;
            else
                score += 1;
            return score;
        }
    }
}
