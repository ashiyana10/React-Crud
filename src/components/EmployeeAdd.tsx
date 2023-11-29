import { useEffect, useState } from "react";
import { employee } from "../Redux-toolkit/employeeModal";
import { addEmployee, editEmployee } from "../Redux-toolkit/EmployeeReducer";
import store from "../Redux-toolkit/Store";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";

type FormField = {
  id: number;
  fullName: string;
  birthDate: Date;
  department: string;
  experience: number;
};

export default function EmployeeAdd() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormField>();
  const navigate = useNavigate();
  const id = useParams().id;
  const [employee, setEmployee] = useState<employee>({
    id: 0,
    fullName: "",
    birthDate: new Date(),
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

    setValue("fullName", employee.fullName);
    setValue("birthDate", employee.birthDate);
    setValue("department", employee.department);
    setValue("experience", employee.experience);
  }, [
    employee.birthDate,
    employee.department,
    employee.experience,
    employee.fullName,
    id,
    setValue,
  ]);
  function onSubmit(data: FormField) {
    data.id = employee.id;
    store.dispatch(!id ? addEmployee(data) : editEmployee(data));
    navigate("/");
  }
  return (
    <div
      className={`m-0 d-flex align-items-center justify-content-center ${styles.heightvh}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <h3 className="mt-2">{!id ? "Add" : "Edit"} Employee</h3>
        <div className="mt-3">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("fullName", {
              required: { value: true, message: "Required" },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters (A-Z) are allowed",
              },
            })}
            defaultValue={employee.fullName}
            className="form-control"
          />
          <p className={`${styles.errorMsg} text-danger`}>
            {errors.fullName?.message}
          </p>
        </div>
        <div className="mt-3">
          <label>Birth Date</label>
          <input
            type="date"
            {...register("birthDate", {
              required: "Required",
            })}
            defaultValue={employee.birthDate}
            className="form-control "
          />
          <p className={`${styles.errorMsg} text-danger`}>
            {errors.birthDate?.message}
          </p>
        </div>
        <div className="mt-3">
          <label>Department</label>
          <input
            type="text"
            {...register("department", {
              required: "Required",
            })}
            placeholder="Department"
            defaultValue={employee.department}
            className="form-control "
          />
          <p className={`${styles.errorMsg} text-danger`}>
            {errors.department?.message}
          </p>
        </div>
        <div className="mt-3">
          <label>Experience</label>
          <input
            type="text"
            placeholder="Experience"
            {...register("experience", {
              required: "Required",
              pattern: {
                value: /^\d+$/,
                message: "Only numbers are allowed for experience",
              },
            })}
          defaultValue={employee.experience}
            className="form-control "
          />
          <p className={`${styles.errorMsg} text-danger`}>
            {errors.experience?.message}
          </p>
        </div>
        <input
          type="submit"
          value={id ? "Edit Employee" : "Add Employee"}
          className="form-control mt-3 bg-info text-white fw-bold"
        />
        <button
          type="button"
          className="form-control border-0"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
