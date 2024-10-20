using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.KoifishRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.VarietyRepository
{
    public class VarietyRepository : GenericDbContextRepository<VietKoiExpoContext, Tblvariety, Guid>, IVarietyRepository
    {
        public VarietyRepository(VietKoiExpoContext context) : base(context)
        {
        }
    }
}
