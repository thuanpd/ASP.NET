import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeForm from "../EmployeeForm";
import config from "../../../utils/config";
function Edit() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/employees/${id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setEmployee(res.data);
        } else {
          toast.error(res.message || "Failed to fetch employee data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        toast.error("Error fetching employee data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (values) => {
    return fetch(`${config.API_BASE_URL}/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message || "Employee updated successfully!");
          navigate("/");
        } else {
          toast.error(res.message || "Failed to update employee.");
        }
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        toast.error("Error updating employee.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <div>
      <EmployeeForm initialValues={employee} onSubmit={handleSubmit} />
    </div>
  );
}

export default Edit;
