import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sa3eed97",
  database: "employeems",
});

con.connect(function (err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log("connection success");
  }
});

export default con;
