using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.ScoreRepository
{
    public class ScoreRepository : GenericDbContextRepository<VietKoiExpoContext, Tblscore, string>, IScoreRepository
    {
        public ScoreRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<Tblscore> GetScoreByScoreIdAsync(string scoreId)
        {
            if (string.IsNullOrWhiteSpace(scoreId))
            {
                throw new ArgumentException("ScoreId cannot be null or empty", nameof(scoreId));
            }

            return await DbSet.FirstOrDefaultAsync(e => e.ScoreId == scoreId);
        }
    }
}
