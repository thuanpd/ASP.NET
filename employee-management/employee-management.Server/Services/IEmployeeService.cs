using employee_management.Server.Models;

public interface IEmployeeService
{
    Task<IEnumerable<Employee>> GetAllEmployees();
    Task<Employee> GetEmployeeById(string employeeId);
    Task<int> AddEmployee(Employee employee);
    Task<bool> UpdateEmployee(Employee employee);
    Task<bool> DeleteEmployee(string employeeId);
    Task<IEnumerable<Employee>> SearchEmployees(SearchDTO searchDto); 
}