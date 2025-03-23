import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../utils/config";
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchFullName, setSearchFullName] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllListEmployee();
  }, []);

  const getAllListEmployee = () => {
    fetch(`${config.API_BASE_URL}/employees`)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setEmployees(res.data || []);
        } else {
          toast.error(res.message || "Failed to fetch employees.");
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        toast.error("Error fetching employees.");
        setEmployees([]);
      });
  };

  const handleSearchEmployee = () => {
    const searchDto = {
      employeeId: searchEmployeeId || null,
      fullName: searchFullName || null,
      phoneNumber: searchPhoneNumber || null,
    };

    fetch(`${config.API_BASE_URL}/employees/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchDto),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setEmployees(res.data || []);
        } else {
          toast.error(res.message || "No employees found.");
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error("Error searching employees:", error);
        toast.error("Error searching employees.");
        setEmployees([]);
      });
  };

  const handleClear = () => {
    setSearchEmployeeId("");
    setSearchFullName("");
    setSearchPhoneNumber("");
    getAllListEmployee();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      fetch(`${config.API_BASE_URL}/employees/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setEmployees((prev) => prev.filter((emp) => emp.employeeId !== id));
            toast.success(res.message || "Employee deleted successfully!");
          } else {
            toast.error(res.message || "Failed to delete employee.");
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          toast.error("Failed to delete employee.");
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mt-5">Employee List</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add New Employee
      </Link>
      <div className="row mb-3">
        <div className="col-md-3 py-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Employee ID..."
            value={searchEmployeeId}
            onChange={(e) => setSearchEmployeeId(e.target.value)}
          />
        </div>
        <div className="col-md-3 py-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Full Name..."
            value={searchFullName}
            onChange={(e) => setSearchFullName(e.target.value)}
          />
        </div>
        <div className="col-md-3 py-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Phone Number..."
            value={searchPhoneNumber}
            onChange={(e) => setSearchPhoneNumber(e.target.value)}
          />
        </div>
        <div className="col-md-3 py-1">
          <button
            className="btn btn-success me-2"
            onClick={handleSearchEmployee}
          >
            Search
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {employees.length === 0 ? (
        <p>
          <span>No data.</span>
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp) => (
                <tr key={emp.employeeId}>
                  <td>{emp?.employeeId}</td>
                  <td>{emp?.fullName}</td>
                  <td>{emp?.department}</td>
                  <td>
                    {new Date(emp?.dateOfBirth).toLocaleDateString("en-CA")}
                  </td>
                  <td>{emp?.phoneNumber}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(emp.employeeId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp.employeeId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
