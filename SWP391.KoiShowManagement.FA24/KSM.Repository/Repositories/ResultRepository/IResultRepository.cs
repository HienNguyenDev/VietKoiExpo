using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.ResultRepository
{
    public interface IResultRepository : IGenericRepository<Tblresult, Guid>
    {
        Task<IEnumerable<Tblresult>> GetByKoiIdAsync(Guid koiId);
        Task<IEnumerable<Tblresult>> GetByCompIdAsync(Guid compId);
        Task<IEnumerable<Tblresult>> GetByKoiIdAndCompIdAsync(Guid koiId, Guid compId);
    }
}
