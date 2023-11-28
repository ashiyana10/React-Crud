import { Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/addEmployee" element={<EmployeeAdd />}></Route>
      <Route path="/editEmployee/:id" element={<EmployeeAdd />}></Route>
    </Routes>
  );
}

export default App;
