using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace App1_3.Models
{
    public class BannedContries
    {
        [Key]
        public int ContryId { get; set; }

        [Required]
        public string CountryName { get; set; }
        public string flag { get; set; }

    }
}
