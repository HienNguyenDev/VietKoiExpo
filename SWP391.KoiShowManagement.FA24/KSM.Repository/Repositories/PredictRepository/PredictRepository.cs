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
    }
}
