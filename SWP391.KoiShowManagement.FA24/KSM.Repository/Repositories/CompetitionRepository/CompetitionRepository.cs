using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.VarietyRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CompetitionRepository
{
    public class CompetitionRepository : GenericDbContextRepository<VietKoiExpoContext, Tblcompetition, string>, ICompetitionRepository
    {
        public CompetitionRepository(VietKoiExpoContext context) : base(context)
        {
        }
    }
}
