using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class NewsModel
    {
        public Guid NewsId { get; set; }

        public string NewsTypeId { get; set; }

        public Guid? UserId { get; set; }

        public DateOnly? NewsDate { get; set; }

        public bool? Status { get; set; }

        public string NewsDescription { get; set; }

        public string ImageUrl { get; set; }
    }
}
