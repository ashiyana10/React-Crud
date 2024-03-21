import { createSlice } from "@reduxjs/toolkit";
import { employee } from "./employeeModal";

const initialState: employee[] = [
  { id: 0, fullName: "", birthDate: "", department: "", experience: 0 },
];
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      action.payload.id = state[length].id + 1;
      state.push(action.payload);
      alert("Employee added");
    },
    editEmployee: (state, action) => {
      const index = state.findIndex((users) => users.id === action.payload.id);

      state[index] = action.payload;
      alert("Employee updated");
    },
    deleteEmployee: (state, action) => {
      const index = state.findIndex((users) => users.id === action.payload);
      state.splice(index, 1);
      alert("Employee deleted");
    },
  },
});

export default employeeSlice.reducer;
export const { addEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;
