using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.ResultRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CheckInRepository
{
    public class CheckInRepository : GenericDbContextRepository<VietKoiExpoContext, TblcheckIn, Guid>, ICheckInRepository
    {
        public CheckInRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<TblcheckIn?> GetByRegistrationIdAsync(Guid registrationId)
        {
            return await DbSet.FirstOrDefaultAsync(c => c.RegistrationId == registrationId);
        }

        public async Task<TblcheckIn?> GetCheckInWithKoiImageAsync(Guid checkInId)
        {
            return await DbSet
                .Include(c => c.Registration)
                .ThenInclude(r => r.Koi)
                .Where(c => c.CheckInId == checkInId)
                .Select(c => new TblcheckIn
                {
                    CheckInId = c.CheckInId,
                    ImageUrl = c.ImageUrl,
                    Status = c.Status,
                    RegistrationId = c.RegistrationId,
                    Registration = new Tblregistration
                    {
                        Koi = new TblkoiFish
                        {
                            ImageUrl = c.Registration.Koi.ImageUrl
                        }
                    }
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<object>> GetCheckInsByCompIdAsync(Guid compId)
        {
            return await DbSet
                .Include(c => c.Registration)
                .ThenInclude(r => r.Koi)
                .Where(c => c.Registration.CompId == compId && c.Registration.Status == 1)
                .Select(c => new
                {
                    CheckInId = c.CheckInId,
                    CheckInImageUrl = c.ImageUrl,
                    Status = c.Status,
                    KoiId = c.Registration.Koi.KoiId,
                    KoiImageUrl = c.Registration.Koi.ImageUrl,
                    Description = c.Description // Added Description property
                })
                .ToListAsync();
        }

    }
}
