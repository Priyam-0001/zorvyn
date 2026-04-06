import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
import financeRoutes from "./routes/finance.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import { auth } from "./middlewares/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/users", userRoutes);

app.use(auth);

app.use("/finances", financeRoutes)

app.use("/dashboard", dashboardRoutes);



app.use(errorHandler);

export default app;