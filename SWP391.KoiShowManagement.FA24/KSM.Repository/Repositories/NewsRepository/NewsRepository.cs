using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.NewsRepository
{
    public class NewsRepository : GenericDbContextRepository<VietKoiExpoContext, Tblnews, Guid>, INewsRepository
    {
        public NewsRepository(VietKoiExpoContext context) : base(context) { }

        public async Task<Tblnews> GetNewsByNameAsync(string newsName)
        {
            if (string.IsNullOrWhiteSpace(newsName))
            {
                throw new ArgumentException("KoiFish name cannot be null or empty", nameof(newsName));
            }

            return await DbSet.FirstOrDefaultAsync(e => e.NewsId.Equals(newsName));
        }
    }
}
