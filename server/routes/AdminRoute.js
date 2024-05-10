import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

  con.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }

    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { expiresIn: 86400 }); // Set cookie and its expiration time
      return res.json({
        loginStatus: true,
        message: "successful login",
      });
    } else {
      return res.json({
        loginStatus: false,
        error: "Invalid email or password",
      });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    else return res.status(200).json(result);
  });
});

router.post("/add_category", (req, res) => {
  const { category } = req.body;
  const sql = "INSERT into category (`cat_name`) values (?) ";
  con.query(sql, [category], (err, result) => {
    if (err) return res.json({ Status: false, error: err.data });
    else return res.json({ Status: true });
  });
});

router.post("/add_employee", (req, res) => {
  const { name, email, password, salary, address, category_id, image } =
    req.body;
  console.log("Sad Error", image);
  const sql =
    "INSERT INTO employees (name, email, password, salary, address, category_id ,image_path) VALUES (?, ?, ?, ?, ?, ?,?)";
  con.query(
    sql,
    [name, email, password, salary, address, category_id, image],
    (err, result) => {
      if (err) {
        return res.status(500).json({ Status: false, error: err.data });
      }
      return res.status(200).json({ Status: true });
    }
  );
});

router.get("/employee", (req, res) => {
  const sql = `select employees.employee_id , employees.name , employees.salary,employees.email  , cat_name as category_name from employees ,category
  where employees.category_id = category.cat_id ;`;
  con.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal server error" });
    else return res.status(200).json(result);
  });
});

export { router as adminRouter };
