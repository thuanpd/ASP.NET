using employee_management.Server.Models;
using MySql.Data.MySqlClient;
using Dapper;

namespace employee_management.Server.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            using var connection = new MySqlConnection(_connectionString);
            var sql = "SELECT * FROM Employee WHERE Status = 'Active'";
            return await connection.QueryAsync<Employee>(sql);
        }


        public async Task<Employee> GetEmployeeById(string employeeId)
        {
            using var connection = new MySqlConnection(_connectionString);
            var sql = "SELECT * FROM Employee WHERE EmployeeId = @EmployeeId";
            return await connection.QueryFirstOrDefaultAsync<Employee>(sql, new { EmployeeId = employeeId });
        }

        public async Task<int> AddEmployee(Employee employee)
        {
            using var connection = new MySqlConnection(_connectionString);
            string newEmployeeId;
            Random random = new Random();
            do
            {
                newEmployeeId = "EMP" + random.Next(10000, 99999).ToString(); 
            }
            while (await connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Employee WHERE EmployeeId = @Id", new { Id = newEmployeeId }) > 0);
            employee.EmployeeId = newEmployeeId;

            var sql = @"INSERT INTO Employee (EmployeeId, FullName, Department, DateOfBirth, Gender, PhoneNumber, Position, Status)
                    VALUES (@EmployeeId, @FullName, @Department, @DateOfBirth, @Gender, @PhoneNumber, @Position, @Status)";

            return await connection.ExecuteAsync(sql, employee);
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            using var connection = new MySqlConnection(_connectionString);
            var sql = @"UPDATE Employee SET 
                    FullName = @FullName, 
                    Department = @Department, 
                    DateOfBirth = @DateOfBirth, 
                    Gender = @Gender, 
                    PhoneNumber = @PhoneNumber, 
                    Position = @Position, 
                    Status = @Status
                    WHERE EmployeeId = @EmployeeId";

            var affectedRows = await connection.ExecuteAsync(sql, employee);
            return affectedRows > 0;
        }

        public async Task<IEnumerable<Employee>> SearchEmployees(string employeID, string fullName, string phone)
        {
            using var connection = new MySqlConnection(_connectionString);

            var sql = @"
                    SELECT * FROM Employee 
                    WHERE Status = 'Active' 
                    AND (@EmployeeId IS NULL OR EmployeeId LIKE @EmployeeId)
                    AND (@FullName IS NULL OR FullName LIKE @FullName)
                    AND (@PhoneNumber IS NULL OR PhoneNumber LIKE @PhoneNumber)";
            var parameters = new
            {
                EmployeeId = employeID,
                FullName = fullName,
                PhoneNumber = phone
            };

            return await connection.QueryAsync<Employee>(sql, parameters);
        }


        public async Task<bool> DeleteEmployee(string employeeId)
        {
            using var connection = new MySqlConnection(_connectionString);
            var sql = "UPDATE Employee SET Status = 'Inactive' WHERE EmployeeId = @EmployeeId";
            var affectedRows = await connection.ExecuteAsync(sql, new { EmployeeId = employeeId });
            return affectedRows > 0;
        }
    }
}
