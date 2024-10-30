using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CompCateRepository
{
    public interface ICompCateRepository : IGenericRepository<TblcompetitionCategory, string>
    {
        Task<IEnumerable<TblcompetitionCategory>> GetAllCategoriesByCompetitionID_1(Guid compId);
        Task<IEnumerable<Tblcategory>> GetAllCategoriesByCompetitionID(Guid compId);
        Task<IEnumerable<TblkoiFish>> GetAllFishByCategoryAndCompId(Guid competitionID, string categoryID);
    }
}
