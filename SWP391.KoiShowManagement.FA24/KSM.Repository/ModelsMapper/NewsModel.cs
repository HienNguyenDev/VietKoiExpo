using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class NewsModel
    {
        public string NewsId { get; set; }

        public string NewsTypeId { get; set; }

        public string UserId { get; set; }

        public DateOnly? Date { get; set; }

        public string Description { get; set; }
    }
}
