using employee_management.Server.Models;
using employee_management.Server.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<IEnumerable<Employee>> GetAllEmployees()
    {
        return await _employeeRepository.GetAllEmployees();
    }

    public async Task<Employee> GetEmployeeById(string employeeId)
    {
        return await _employeeRepository.GetEmployeeById(employeeId);
    }

    public async Task<int> AddEmployee(Employee employee)
    {
        return await _employeeRepository.AddEmployee(employee);
    }

    public async Task<bool> UpdateEmployee(Employee employee)
    {
        return await _employeeRepository.UpdateEmployee(employee);
    }

    public async Task<bool> DeleteEmployee(string employeeId)
    {
        return await _employeeRepository.DeleteEmployee(employeeId);
    }
    public async Task<IEnumerable<Employee>> SearchEmployees(SearchDTO searchDto)
    {
        if (searchDto == null)
        {
            throw new ArgumentNullException(nameof(searchDto), "SearchDTO cannot be null");
        }
        searchDto.EmployeeId = string.IsNullOrEmpty(searchDto.EmployeeId) ? null : $"%{searchDto.EmployeeId}%";
        searchDto.FullName = string.IsNullOrEmpty(searchDto.FullName) ? null : $"%{searchDto.FullName}%";
        searchDto.PhoneNumber = string.IsNullOrEmpty(searchDto.PhoneNumber) ? null : $"%{searchDto.PhoneNumber}%";

        return await _employeeRepository.SearchEmployees(searchDto.EmployeeId, searchDto.FullName, searchDto.PhoneNumber);
    }
}
