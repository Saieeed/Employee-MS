import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    image: null,
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get("http://localhost:3000/auth/category")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const categoryId = categories.find(
        (cat) => cat.cat_name === value
      )?.cat_id;
      setEmployee({
        ...employee,
        category_id: categoryId, // Set category_id instead of category
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setEmployee({
      ...employee,
      image: imageFile,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("image", employee.image);

      // Send the file to the server
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the response contains the file path
      const imagePath = response.data.imagePath;

      // Add the file path to the employee data
      const employeeData = { ...employee, image: imagePath };

      // Now send the employee data to your backend endpoint
      const res = await axios.post(
        "http://localhost:3000/auth/add_employee",
        employeeData
      );

      if (res.data.Status) {
        navigate("/dashboard/employee");
      } else {
        alert("Error Inserting Data");
      }
    } catch (error) {
      console.error(error);
      alert("Error Occurred. Please try again later.");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="p-3 rounded border">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="d-block">
              <strong>Employee Name</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Employee Name"
              className="form-control rounded-0 mb-3"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="d-block">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0 mb-3"
              value={employee.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="d-block">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0 mb-3"
              value={employee.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="d-block">
              <strong>Salary</strong>
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="Enter Salary"
              className="form-control rounded-0 mb-3"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="d-block">
              <strong>Address</strong>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              className="form-control rounded-0 mb-3"
              value={employee.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="d-block">
              <strong>Select Category</strong>
            </label>
            <select
              id="category"
              name="category"
              className="form-select rounded-0 mb-3"
              value={employee.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.cat_id} value={category.cat_name}>
                  {category.cat_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="d-block">
              <strong>Select Image</strong>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control rounded-0 mb-3"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
