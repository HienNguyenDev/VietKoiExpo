using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.NewsRepository
{
    public interface INewsRepository : IGenericRepository<Tblnews, string>
    {
        Task<Tblnews> GetNewsByNameAsync(string newsName);
    }
}
