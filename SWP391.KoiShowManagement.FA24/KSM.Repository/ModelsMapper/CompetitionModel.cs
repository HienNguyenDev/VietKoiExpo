using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class CompetitionModel
    {
        //public string CompId { get; set; }

        //public string CategoryId { get; set; }

        public string CompName { get; set; }

        public string CompDescription { get; set; }

        public string Location { get; set; }

        public string ImageUrl { get; set; }

        public DateOnly? StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public bool? Status { get; set; }
    }
}
