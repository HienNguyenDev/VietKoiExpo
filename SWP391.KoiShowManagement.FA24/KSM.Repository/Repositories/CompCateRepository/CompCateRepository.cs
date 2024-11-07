using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CompCateRepository
{
    public class CompCateRepository : GenericDbContextRepository<VietKoiExpoContext, TblcompetitionCategory, string>, ICompCateRepository
    {
        public CompCateRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Tblcategory>> GetAllCategoriesByCompetitionID(Guid compId)
        {
            var categories = await _context.TblcompetitionCategories
       .Where(cc => cc.CompId == compId)
       .Select(ccc => ccc.Category)
       .Distinct()// Get distinct categories
       .OrderBy(c => c.CategoryName) // Order by category name
       .ToListAsync(); // Convert to a list asynchronously

            return categories;
        }

        

        public async Task<IEnumerable<TblkoiFish>> GetAllFishByCategoryAndCompId(Guid competitionID, string categoryID)
        {
            return await _context.TblcompetitionCategories
                .Where(cc => cc.CompId == competitionID && cc.CategoryId == categoryID)
                .Select(cc => cc.Koi).Distinct() // Directly select Koi entities
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetAllCategoryIdsByCompetitionId(Guid compId)
        {
            return await DbSet.Where(f => f.CompId == compId)
                .Select(f => f.Category.CategoryId)
                .ToListAsync();
        }

        public async Task<List<TblkoiFish>> GetAllFishByCompetitionId(Guid compId)
        {
            return await _context.TblkoiFishes
                .Include(k => k.Tblscores) // Include scores if needed
                .Include(k => k.Tblregistrations) // Include registrations to access RegistrationId
                    .ThenInclude(r => r.TblcheckIns) // Include check-ins to filter by Status
                .Where(k => k.Tblregistrations.Any(r => r.CompId == compId && r.Status == 1
                                                        && r.TblcheckIns.Any(c => c.Status == 1)))
                .ToListAsync();
        }
    }
}
