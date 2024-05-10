import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success ">
        Add Category
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.cat_id}>
                <td>{category.cat_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
