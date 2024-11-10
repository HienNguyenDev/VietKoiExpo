using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.ScoreRepository
{
    public interface IScoreRepository : IGenericRepository<Tblscore, Guid>
    {
    }
}
