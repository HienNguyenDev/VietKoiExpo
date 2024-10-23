using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using KSM.Repository.Repositories.NewsRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.RegistrationRepository
{
    public class RegistrationRepository : GenericDbContextRepository<VietKoiExpoContext, Tblregistration, Guid>, IRegistrationRepository
    {
        public RegistrationRepository(VietKoiExpoContext context) : base(context)
        {
        }
    }
}
