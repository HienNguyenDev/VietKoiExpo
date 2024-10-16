using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class CategoryModel
    {
        public string CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string Species { get; set; }

        public int? Size { get; set; }

        public int? Age { get; set; }

        public string CategoryDescription { get; set; }
    }
}
