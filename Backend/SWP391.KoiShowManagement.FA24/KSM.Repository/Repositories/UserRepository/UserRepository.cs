﻿using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.UserRepository
{
    public class UserRepository : GenericDbContextRepository<VietKoiExpoContext, Tbluser, Guid>, IUserRepository
    {
        public UserRepository(VietKoiExpoContext context) : base(context) 
        {
        }

        public async Task<Tbluser> GetByEmail(string email)
        {
            return await DbSet.FirstOrDefaultAsync(u => u.Email == email);
        }
    }

}
