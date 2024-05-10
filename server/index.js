import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/AdminRoute.js"; // Corrected import path
import { fileUpload } from "./routes/Fileupload.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/", fileUpload); // Mount the adminRouter under the "/auth" prefix
app.listen(3000, () => {
  console.log("Server is Running");
});
