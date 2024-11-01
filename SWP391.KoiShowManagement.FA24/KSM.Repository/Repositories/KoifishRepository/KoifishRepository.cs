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
    }
}
