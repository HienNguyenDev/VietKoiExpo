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
    }
}
