using System.Collections.Generic;
using System.Linq;
using EmployeeManagementWEBAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagementWEBAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeManagementContext _context;

        public EmployeesController(EmployeeManagementContext context)
        {
            _context = context;

            if (_context.Employee.Count() == 0)
            {
                _context.Employee.Add(new Employee { FirstName = "lea", LastName = "li", Gender = "F", Department = "developer" });
                _context.SaveChanges();
            }
        }

        #region GetEmployee
        [HttpGet]
        public ActionResult<List<Employee>> GetAll()
        {
            return _context.Employee.ToList();
        }

        [HttpGet("{id}", Name = "GetEmployeeById")]
        public ActionResult<Employee> GetById(long id)
        {
            var employee = _context.Employee.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }
        #endregion

        #region CreateEmployee
        [HttpPost]
        public ActionResult Create(Employee employee)
        {
            _context.Employee.Add(employee);
            _context.SaveChanges();

            return CreatedAtRoute("GetEmployeeById", new { id = employee.ID }, employee);
        }
        #endregion

        #region UpdateEmployee
        [HttpPut("{id}")]
        public ActionResult Update(long id, Employee updateEmployee)
        {
            var employee = _context.Employee.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.FirstName = updateEmployee.FirstName;
            employee.LastName= updateEmployee.LastName;
            employee.Gender = updateEmployee.Gender;
            employee.Birth = updateEmployee.Birth;
            employee.Department = updateEmployee.Department;
            employee.Address = updateEmployee.Address;
            employee.Phone = updateEmployee.Phone;
            employee.Email = updateEmployee.Email;

            _context.Employee.Update(employee);
            _context.SaveChanges();
            return NoContent();
        }
        #endregion

        #region DeleteEmployee
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var employee = _context.Employee.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
        #endregion

        #region SelectEmployee
        [HttpGet]
        public ActionResult<List<Employee>> Select([FromQuery]Employee employee)
        {
            IQueryable<Employee> employees = _context.Employee;

            if (!string.IsNullOrEmpty(employee.FirstName))
            {
                employees = employees.Where(e=>e.FirstName.Contains(employee.FirstName.Trim()));
            }

            if (!string.IsNullOrEmpty(employee.Gender))
            {
                employees = employees.Where(e => e.Gender.Contains(employee.Gender));
            }

            if (!string.IsNullOrEmpty(employee.Department))
            {
                employees = employees.Where(s => s.Department.Contains(employee.Department));
            }

            return employees.ToList();
        }
        #endregion
    }
}