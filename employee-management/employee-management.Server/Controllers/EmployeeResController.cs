using employee_management.Server.Dto;
using employee_management.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace employee_management.Server.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiRespon>> GetAllEmployees()
        {
            try
            {
                var employees = await _employeeService.GetAllEmployees();
                return Ok(new ApiRespon
                {
                    success = true,
                    message = "Employees retrieved successfully",
                    data = employees
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error retrieving employees: {ex.Message}",
                    data = new List<Employee>()
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiRespon>> GetEmployeeById(string id)
        {
            try
            {
                var employee = await _employeeService.GetEmployeeById(id);
                if (employee == null)
                {
                    return NotFound(new ApiRespon
                    {
                        success = false,
                        message = "Employee not found",
                        data = null
                    });
                }
                return Ok(new ApiRespon
                {
                    success = true,
                    message = "Employee retrieved successfully",
                    data = employee
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error retrieving employee: {ex.Message}",
                    data = null
                });
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApiRespon>> AddEmployee([FromBody] Employee employee)
        {
            try
            {
                var result = await _employeeService.AddEmployee(employee);
                if (result > 0)
                {
                    return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, new ApiRespon
                    {
                        success = true,
                        message = "Employee added successfully",
                        data = employee
                    });
                }
                return BadRequest(new ApiRespon
                {
                    success = false,
                    message = "Failed to add employee",
                    data = null
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error adding employee: {ex.Message}",
                    data = null
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiRespon>> UpdateEmployee(string id, [FromBody] Employee employee)
        {
            try
            {
                if (id != employee.EmployeeId)
                {
                    return BadRequest(new ApiRespon
                    {
                        success = false,
                        message = "Mismatched Employee ID",
                        data = null
                    });
                }

                var result = await _employeeService.UpdateEmployee(employee);
                if (result)
                {
                    return Ok(new ApiRespon
                    {
                        success = true,
                        message = "Employee updated successfully",
                        data = employee
                    });
                }

                return NotFound(new ApiRespon
                {
                    success = false,
                    message = "Employee not found",
                    data = null
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error updating employee: {ex.Message}",
                    data = null
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiRespon>> DeleteEmployee(string id)
        {
            try
            {
                var result = await _employeeService.DeleteEmployee(id);
                if (result)
                {
                    return Ok(new ApiRespon
                    {
                        success = true,
                        message = "Employee deleted successfully",
                        data = null
                    });
                }
                return NotFound(new ApiRespon
                {
                    success = false,
                    message = "Employee not found",
                    data = null
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error deleting employee: {ex.Message}",
                    data = null
                });
            }
        }

        [HttpPost("search")]
        public async Task<ActionResult<ApiRespon>> SearchEmployees([FromBody] SearchDTO searchDto)
        {
            try
            {
                var employees = await _employeeService.SearchEmployees(searchDto);
                return Ok(new ApiRespon
                {
                    success = true,
                    message = "Employees retrieved successfully",
                    data = employees
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiRespon
                {
                    success = false,
                    message = $"Error searching employees: {ex.Message}",
                    data = new List<Employee>()
                });
            }
        }
    }
}
