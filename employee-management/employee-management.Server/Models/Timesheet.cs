namespace employee_management.Server.Models
{
    public class Timesheet
    {
        public int TimesheetId { get; set; }
        public string EmployeeId { get; set; }  
        public DateTime WorkDate { get; set; } 
        public DateTime CheckInTime { get; set; }  
        public DateTime CheckOutTime { get; set; }  
    }
}
