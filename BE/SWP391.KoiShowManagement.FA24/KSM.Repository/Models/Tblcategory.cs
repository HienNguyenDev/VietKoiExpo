﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace KSM.Repository.Models;

public partial class Tblcategory
{
    public string CategoryId { get; set; }

    public string CategoryName { get; set; }

    public string Species { get; set; }

    public int? Size { get; set; }

    public int? Age { get; set; }

    public string CategoryDescription { get; set; }

    public virtual ICollection<Tblcompetition> Tblcompetitions { get; set; } = new List<Tblcompetition>();
}