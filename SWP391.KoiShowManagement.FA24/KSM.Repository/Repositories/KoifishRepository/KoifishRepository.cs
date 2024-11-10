using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.KoifishRepository
{
    public class KoifishRepository : GenericDbContextRepository<VietKoiExpoContext, TblkoiFish, Guid>, IKoifishRepository
    {
        public KoifishRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TblkoiFish>> GetAllByUserIdAsync(Guid userId)
        {
            return await DbSet.Where(f => f.UserId == userId).ToListAsync();
        }

        public async Task<Guid> GetUserByKoiFishIdAsync(Guid koiFishId)
        {

            var koiFish = await DbSet.FirstOrDefaultAsync(f => f.KoiId == koiFishId);
            if (koiFish == null)
            {
                return Guid.Empty; // Or handle the case where the KoiFish is not found
            }

            return (Guid)koiFish.UserId;

        }

        public async Task<IEnumerable<Tblregistration>> GetRegistrationsByKoiIdAsync(Guid koiFishId)
        {
            return await _context.Tblregistrations
                .Include(reg => reg.Comp) // Include the related competition
                .Where(reg => reg.KoiId == koiFishId)
                .ToListAsync();
        }

        public async Task SetRelatedEntitiesStatusToInactive(Guid koiFishId)
        {
            try
            {
                var registrations = await _context.Tblregistrations.Where(reg => reg.KoiId == koiFishId).ToListAsync();

                // Set registration statuses to 2 if koi fish status is set to 0
                registrations.ForEach(reg => reg.Status = 2);

                var predictions = await _context.Tblpredictions.Where(p => p.KoiId == koiFishId).ToListAsync();
                predictions.ForEach(p => p.Status = false);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception or handle it as necessary
                throw new Exception("An error occurred while updating related entities' statuses.", ex);
            }
        }
    }
}
