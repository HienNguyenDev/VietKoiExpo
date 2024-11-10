using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.ModelsMapper
{
    public class UserModel
    {
        public Guid UserId { get; set; }
        public string RoleId { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string? ImageUrl { get; set; }

        public int? Experience { get; set; }

        public bool? Status { get; set; }
    }
}
