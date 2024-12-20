﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace KSM.Repository.Models;

public partial class Tbluser
{
    public Guid UserId { get; set; }

    public string RoleId { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string FullName { get; set; }

    public string Phone { get; set; }

    public string Address { get; set; }

    public string ImageUrl { get; set; }

    public int? Experience { get; set; }

    public bool? Status { get; set; }

    public virtual Tblrole Role { get; set; }

    public virtual ICollection<TblkoiFish> TblkoiFishes { get; set; } = new List<TblkoiFish>();

    public virtual ICollection<Tblnews> Tblnews { get; set; } = new List<Tblnews>();

    public virtual ICollection<Tblscore> Tblscores { get; set; } = new List<Tblscore>();

    public virtual ICollection<Tbltask> Tbltasks { get; set; } = new List<Tbltask>();
}