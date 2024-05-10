import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((response) => {
        setEmployees(response.data);
        console.log(employees);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employees List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success ">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>email</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.salary}</td>
                <td>{employee.email}</td>
                <td>{employee.category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
