import { Link } from "react-router-dom";
import { employee } from "../Redux-toolkit/employeeModal";
import store from "../Redux-toolkit/Store";
import styles from "./style.module.css";
import { deleteEmployee } from "../Redux-toolkit/EmployeeReducer";
import { useEffect, useState } from "react";

function deleteEmployeeFun(id: number) {
  if (confirm("Are you sure you want to delete employee?")) {
    store.dispatch(deleteEmployee(id));
  }
}

export default function EmployeeList() {
  const [employeeData, setEmployeeData] = useState([
    { id: 0, fullName: "", birthDate: "", department: "", experience: 0 },
  ]);
  useEffect(() => {
    setEmployeeData(store.getState().persistReducers.employeeSlice);
    store.subscribe(() => {
      setEmployeeData(store.getState().persistReducers.employeeSlice);
      console.log(employeeData);
    });
  }, [employeeData]);
  return (
    <div
      className={`m-auto d-flex align-items-center justify-content-center ${styles.heightvh}`}
    >
      <div className="w-75 table-responsive">
        <h2 className={styles.center}>employeeList</h2>
        <table className={`mt-3 ${styles.center} table`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Birth Date</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!employeeData.length && (
              <tr>
                <td colSpan={6}>No Employee</td>
              </tr>
            )}
            {employeeData.map((employee: employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.fullName}</td>
                <td>{employee.birthDate}</td>
                <td>{employee.department}</td>
                <td>{employee.experience}</td>
                <td>
                  <Link to={`editEmployee/${employee.id}`}>Edit</Link>
                  <a
                    type="button"
                    onClick={() => deleteEmployeeFun(employee.id)}
                    className="ms-3"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.center}>
          <Link to="/addEmployee">Add Employee</Link>
        </p>
      </div>
    </div>
  );
}
