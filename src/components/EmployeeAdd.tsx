import { useEffect, useState } from "react";
import { employee } from "../Redux-toolkit/employeeModal";
import { addEmployee, editEmployee } from "../Redux-toolkit/EmployeeReducer";
import store from "../Redux-toolkit/Store";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";

export default function EmployeeAdd() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [employee, setEmployee] = useState<employee>({
    id: 1,
    fullName: "",
    birthDate: "",
    department: "",
    experience: 0,
  });
  useEffect(() => {
    {
      id
        ? setEmployee(
            store
              .getState()
              .persistReducers.employeeSlice.filter(
                (employee: employee) => employee.id === Number(id)
              )[0]
          )
        : "";
    }
  }, [id]);

  return (
    <div
      className={`m-0 d-flex align-items-center justify-content-center ${styles.heightvh}`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          store.dispatch(!id ? addEmployee(employee) : editEmployee(employee));
          navigate("/");
        }}
        className="w-25"
      >
        <h3 className="mt-2">{!id ? "Add" : "Edit"} Employee</h3>
        <div className="mt-3">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Name"
            value={employee.fullName}
            onChange={(e) =>
              setEmployee({ ...employee, fullName: e.target.value })
            }
            className="form-control "
          />
        </div>
        <div className="mt-3">
          <label>Birth Date</label>
          <input
            type="date"
            value={employee.birthDate}
            onChange={(e) =>
              setEmployee({ ...employee, birthDate: e.target.value })
            }
            className="form-control "
          />
        </div>
        <div className="mt-3">
          <label>Department</label>
          <input
            type="text"
            placeholder="Department"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            className="form-control "
          />
        </div>
        <div className="mt-3">
          <label>Experience</label>
          <input
            type="text"
            placeholder="Experience"
            value={employee.experience}
            onChange={(e) =>
              setEmployee({ ...employee, experience: Number(e.target.value) })
            }
            className="form-control "
          />
        </div>
        <input
          type="submit"
          value={id ? "Edit Employee" : "Add Employee"}
          className="form-control mt-3 bg-info text-white fw-bold"
        />
        <button type="button" className="form-control border-0" onClick={()=>navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}
