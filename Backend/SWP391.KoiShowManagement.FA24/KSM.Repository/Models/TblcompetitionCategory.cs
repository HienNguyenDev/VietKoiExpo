﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace KSM.Repository.Models;

public partial class TblcompetitionCategory
{
    public Guid CompetitionCategoryId { get; set; }

    public Guid? CompId { get; set; }

    public string CategoryId { get; set; }

    public Guid? KoiId { get; set; }

    public virtual Tblcategory Category { get; set; }

    public virtual Tblcompetition Comp { get; set; }

    public virtual TblkoiFish Koi { get; set; }
}