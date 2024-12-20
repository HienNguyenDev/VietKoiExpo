﻿using KSM.Repository.Models;
using KSM.Repository.Repositories.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.PredictRepository
{
    public interface IPredictRepository : IGenericRepository<Tblprediction, string>
    {
        float PredictKoiScore(string variety, int size, int age);
    }
}
