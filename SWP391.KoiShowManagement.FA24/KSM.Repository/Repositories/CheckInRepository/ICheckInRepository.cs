using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CheckInRepository
{
    public interface ICheckInRepository : IGenericRepository<TblcheckIn, Guid>
    {
        Task<TblcheckIn?> GetByRegistrationIdAsync(Guid registrationId);
        Task<TblcheckIn?> GetCheckInWithKoiImageAsync(Guid checkInId);
        Task<IEnumerable<object>> GetCheckInsByCompIdAsync(Guid compId);
        Task<IEnumerable<object>> GetKoiWithCheckInStatusByCompIdAsync(Guid compId);
    }
}
