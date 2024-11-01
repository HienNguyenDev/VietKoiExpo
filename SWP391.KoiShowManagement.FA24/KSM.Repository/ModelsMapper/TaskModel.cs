using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class TaskModel
    {
        public Guid TaskId { get; set; }
        public string TaskName { get; set; }

        public Guid? UserId { get; set; }

        public Guid? CompId { get; set; }

        public string TaskDescription { get; set; }

        public DateOnly? Date { get; set; }
        public bool? Status { get; set; }
    }
}
