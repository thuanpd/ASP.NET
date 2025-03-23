using employee_management.Server.Models;

namespace employee_management.Server.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(string employeeId);
        Task<int> AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(Employee employee);
        Task<bool> DeleteEmployee(string employeeId);
        Task<IEnumerable<Employee>> SearchEmployees(string employeID,string fullName,string phone);
    }
}
