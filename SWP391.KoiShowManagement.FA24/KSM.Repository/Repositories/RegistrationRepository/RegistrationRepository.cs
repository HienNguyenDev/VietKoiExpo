using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.NewsRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.RegistrationRepository
{
    public class RegistrationRepository : GenericDbContextRepository<VietKoiExpoContext, Tblregistration, Guid>, IRegistrationRepository
    {
        public RegistrationRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<Guid> GetKoiFishIDByRegistIdAsync(Guid registId)
        {
            var regist = await DbSet.FirstOrDefaultAsync(f => f.RegistrationId == registId);
            if (regist == null)
            {
                return Guid.Empty; // Or handle the case where the KoiFish is not found
            }

            return (Guid)regist.KoiId;
        }

        public async Task<Guid> GetCompIDByRegistIdAsync(Guid registId)
        {
            var regist = await DbSet.FirstOrDefaultAsync(f => f.RegistrationId == registId);
            if (regist == null)
            {
                return Guid.Empty; // Or handle the case where the KoiFish is not found
            }

            return (Guid)regist.CompId;
        }

    }
}
