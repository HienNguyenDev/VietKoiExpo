using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.ScoreRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.ResultRepository
{
    public class ResultRepository : GenericDbContextRepository<VietKoiExpoContext, Tblresult, Guid>, IResultRepository
    {
        public ResultRepository(VietKoiExpoContext context) : base(context)
        {
        }

    }
}
