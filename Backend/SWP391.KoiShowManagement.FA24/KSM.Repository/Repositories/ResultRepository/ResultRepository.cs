using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.ScoreRepository;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IEnumerable<Tblresult>> GetByKoiIdAsync(Guid koiId)
        {
            // Retrieves results by the KoiId
            return await DbSet.Where(r => r.KoiId == koiId).ToListAsync();
        }

        public async Task<IEnumerable<Tblresult>> GetByCompIdAsync(Guid compId)
        {
            // Retrieves results by the CompId
            return await DbSet.Where(r => r.CompId == compId).ToListAsync();
        }

        public async Task<IEnumerable<Tblresult>> GetByKoiIdAndCompIdAsync(Guid koiId, Guid compId)
        {
            // Retrieves results that match both KoiId and CompId
            return await DbSet.Where(r => r.KoiId == koiId && r.CompId == compId).ToListAsync();
        }
    }
}
