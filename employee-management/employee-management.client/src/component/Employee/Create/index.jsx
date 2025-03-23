import EmployeeForm from "../EmployeeForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../utils/config";
function Create() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    return fetch(`${config.API_BASE_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message || "Employee add successfully!");
          navigate("/");
        } else {
          toast.error(res.message || "Failed to add employee.");
        }
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        toast.error("Error creating employee.");
      });
  };

  return (
    <div>
      <EmployeeForm
        initialValues={{
          employeeId: "",
          fullName: "",
          department: "",
          dateOfBirth: "",
          phoneNumber: "",
          position: "",
          status: "Active",
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Create;
