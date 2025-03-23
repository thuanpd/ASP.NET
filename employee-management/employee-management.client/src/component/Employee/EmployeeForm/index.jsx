import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EmployeeForm({ initialValues, onSubmit }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      employeeId: initialValues.employeeId || "", 
      gender: initialValues.gender || "",
      status: initialValues.status || "Active",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      department: Yup.string().required("Department is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone Number must be digits")
        .min(10, "Phone Number must be at least 10 digits")
        .required("Phone Number is required"),
      position: Yup.string().required("Position is required"),
      gender: Yup.string()
        .oneOf(["M", "F"], "Invalid gender selection")
        .required("Gender is required"),
      status: Yup.string()
        .oneOf(["Active", "Inactive"], "Invalid status selection")
        .required("Status is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values)
        .then(() => {
          navigate("/");
        })
        .catch((error) => toast.error("Error: " + error.message));
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center py-4">
        {initialValues.employeeId ? "Edit Employee" : "Add New Employee"}
      </h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        Back to List
      </button>
      <form
        onSubmit={formik.handleSubmit}
        className="border mt-5 p-4 rounded bg-light"
      >
        <div className="row">
            
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.employeeId && formik.errors.employeeId
                    ? "is-invalid"
                    : ""
                }`}
                name="employeeId"
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
              />
              {formik.touched.employeeId && formik.errors.employeeId && (
                <div className="invalid-feedback">
                  {formik.errors.employeeId}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "is-invalid"
                    : ""
                }`}
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="invalid-feedback">{formik.errors.fullName}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.department && formik.errors.department
                    ? "is-invalid"
                    : ""
                }`}
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.department && formik.errors.department && (
                <div className="invalid-feedback">
                  {formik.errors.department}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "is-invalid"
                    : ""
                }`}
                name="dateOfBirth"
                value={
                  formik.values.dateOfBirth
                    ? formik.values.dateOfBirth.split("T")[0]
                    : ""
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="invalid-feedback">
                  {formik.errors.dateOfBirth}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "is-invalid"
                    : ""
                }`}
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="invalid-feedback">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.position && formik.errors.position
                    ? "is-invalid"
                    : ""
                }`}
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.position && formik.errors.position && (
                <div className="invalid-feedback">{formik.errors.position}</div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className={`form-control ${
                  formik.touched.gender && formik.errors.gender
                    ? "is-invalid"
                    : ""
                }`}
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="invalid-feedback">{formik.errors.gender}</div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className={`form-control ${
                  formik.touched.status && formik.errors.status
                    ? "is-invalid"
                    : ""
                }`}
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="invalid-feedback">{formik.errors.status}</div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">
          {initialValues.employeeId ? "Update Employee" : "Save Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
