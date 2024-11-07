﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace KSM.Repository.Models;

public partial class TblkoiFish
{
    public Guid KoiId { get; set; }

    public string VarietyId { get; set; }

    public Guid? UserId { get; set; }

    public string KoiName { get; set; }

    public int? Size { get; set; }

    public int? Age { get; set; }

    public string ImageUrl { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<TblcompetitionCategory> TblcompetitionCategories { get; set; } = new List<TblcompetitionCategory>();

    public virtual ICollection<Tblprediction> Tblpredictions { get; set; } = new List<Tblprediction>();

    public virtual ICollection<Tblregistration> Tblregistrations { get; set; } = new List<Tblregistration>();

    public virtual ICollection<Tblresult> Tblresults { get; set; } = new List<Tblresult>();

    public virtual ICollection<Tblscore> Tblscores { get; set; } = new List<Tblscore>();

    public virtual Tbluser User { get; set; }

    public virtual Tblvariety Variety { get; set; }
}