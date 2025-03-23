using Microsoft.AspNetCore.Mvc;

namespace employee_management.Server.Models
{ 
public class Employee
{
        public string EmployeeId { get; set; } 
        public string FullName { get; set; } 
        public string Department { get; set; }
        public DateTime? DateOfBirth { get; set; }  
        public char? Gender { get; set; }
        public string PhoneNumber { get; set; }  
        public string Position { get; set; }
        public string Status { get; set; } = "Active";
    }
}