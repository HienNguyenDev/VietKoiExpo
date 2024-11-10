using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.CategoryRepository
{
    public class CategoryRepository : GenericDbContextRepository<VietKoiExpoContext, Tblcategory, string>, ICategoryRepository
    {
        public CategoryRepository(VietKoiExpoContext context) : base(context)
        {
        }
    }
}
