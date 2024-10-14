using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.VarietyRepository
{
    public class VarietyRepository : GenericDbContextRepository<VietKoiExpoContext, Tblvariety, string>, IVarietyRepository
    {
        public VarietyRepository(VietKoiExpoContext context) : base(context)
        {
        }

        public async Task<Tblvariety> GetVarietyByVarietyNameAsync(string VarietyName)
        {
            if (string.IsNullOrWhiteSpace(VarietyName))
            {
                throw new ArgumentException("VarietyName cannot be null or empty", nameof(VarietyName));
            }

            return await DbSet.FirstOrDefaultAsync(e => e.VarietyId == VarietyName);
        }
    }
}
