using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Mario_Fornaroli_CV.Models
{
    public class ContactUs
    {
        public string form_name { get; set; }
        public string form_email { get; set; }
        public string form_message { get; set; }
    }
}

