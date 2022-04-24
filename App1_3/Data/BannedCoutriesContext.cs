using App1_3.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App1_3.Data
{
    public class BannedCoutriesContext : DbContext
{
    public BannedCoutriesContext(DbContextOptions<BannedCoutriesContext> options)
        : base(options)
    {

    }

    public DbSet<BannedContries> Coutries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BannedContries>().HasData(
            new BannedContries() { ContryId = 174, CountryName = "Egypt",flag= "https://flagcdn.com/w320/eg.png" },
            new BannedContries() { ContryId = 8, CountryName = "United States", flag = "https://flagcdn.com/w320/us.png" },
            new BannedContries() { ContryId = 148, CountryName = "Greece", flag = "https://flagcdn.com/w320/gr.png" },
            new BannedContries() { ContryId = 96, CountryName = "Iraq", flag = "https://flagcdn.com/w320/iq.png" },
            new BannedContries() { ContryId = 101, CountryName = "Norway", flag = "https://flagcdn.com/w320/no.png" },
            new BannedContries() { ContryId = 73, CountryName = "Panama", flag = "https://flagcdn.com/w320/pa.png" },
            new BannedContries() { ContryId = 141, CountryName = "Benin", flag = "https://flagcdn.com/w320/bj.png" },
            new BannedContries() { ContryId = 160, CountryName = "Pakistan", flag = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png" },
            new BannedContries() { ContryId = 54, CountryName = "Iceland", flag = "https://flagcdn.com/w320/is.png" },
            new BannedContries() { ContryId = 16, CountryName = "Uganda", flag = "https://flagcdn.com/w320/ug.png" }
        );
    }
}
}
