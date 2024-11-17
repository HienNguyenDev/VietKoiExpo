using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.KoifishRepository
{
    public interface IKoifishRepository : IGenericRepository<TblkoiFish, Guid>
    {

        Task<IEnumerable<TblkoiFish>> GetAllByUserIdAsync(Guid userId);

        Task<Guid> GetUserByKoiFishIdAsync(Guid koiFishId);
        Task<IEnumerable<Tblregistration>> GetRegistrationsByKoiIdAsync(Guid koiFishId);
        Task SetRelatedEntitiesStatusToInactive(Guid koiFishId);
        Task<IEnumerable<object>> GetCheckedInKoiWithScoreStatus(Guid compId, Guid userId);
    }
}
