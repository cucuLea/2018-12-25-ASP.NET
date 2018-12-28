using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementWEBAPI.Models
{

    public class Employee
    {

        public long? ID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public DateTime? Birth { get; set; }

        public string Department { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }
    }
}
