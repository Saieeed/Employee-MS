import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState(""); // Initialize category state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // Update the category state with the value entered by the user
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(category); // Log the category value
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
          console.log(result);
        } else {
          alert("Error Inserting Data");
          console.log(result);
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded border">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Category</strong>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter Category"
              className="form-control rounded-0 mb-3"
              value={category} // Bind the input value to the category state
              onChange={handleInputChange} // Call handleInputChange on input change
            />
          </div>
          <button
            // onClick={handleSubmit} // Call handleSubmit on button click
            className="mb-2 btn btn-success w-100 rounded-0"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
