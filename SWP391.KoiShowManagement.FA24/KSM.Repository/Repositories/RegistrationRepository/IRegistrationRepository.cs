using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.RegistrationRepository
{
    public interface IRegistrationRepository : IGenericRepository<Tblregistration, Guid>
    {
        Task<Guid> GetKoiFishIDByRegistIdAsync(Guid registId);
        Task<Guid> GetCompIDByRegistIdAsync(Guid registId);

        Task<IEnumerable<Tblregistration>> GetAllByCompIdAsync(Guid compId);

        Task<IEnumerable<Tblregistration>> GetAllByCompIdAndGotRejectedAsync(Guid compId);
    }
}
