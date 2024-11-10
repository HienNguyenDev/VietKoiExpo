using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CompetitionRepository
{
    public class CompetitionRepository : GenericDbContextRepository<VietKoiExpoContext, Tblcompetition, Guid>, ICompetitionRepository
    {
        public CompetitionRepository(VietKoiExpoContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Tblcompetition>> GetAllWithCategoriesAsync()
        {
            return await DbSet
                .Include(c => c.TblcompetitionCategories)
                .ToListAsync();
        }

        public async Task<Tblcompetition> GetByIDWithCategoriesAsync(Guid id)
        {
            return await DbSet
                .Include(c => c.TblcompetitionCategories)
                .FirstOrDefaultAsync(c => c.CompId == id);
        }
    }
}
