using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementWEBAPI.Models
{
    public class EmployeeManagementContext:DbContext
    {
        public EmployeeManagementContext(DbContextOptions<EmployeeManagementContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
    }
}
