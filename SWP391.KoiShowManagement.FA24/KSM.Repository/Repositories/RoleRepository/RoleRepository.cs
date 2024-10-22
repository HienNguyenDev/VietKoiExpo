using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.ScoreRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.RoleRepository
{
    public class RoleRepository : GenericDbContextRepository<VietKoiExpoContext, Tblrole, string>, IRoleRepository
    {
        public RoleRepository(VietKoiExpoContext context) : base(context)
        {
        }
    }
}
