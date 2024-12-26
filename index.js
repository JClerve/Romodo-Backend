const express = require("express");
const connectDB = require("./utils/db");
const env = require("dotenv");
const errorHandler = require("./middlewares/ErrorHandler");
const cors = require("cors");
const vehicleRoute = require("./routes/vehicle.route");
const driverRoute = require("./routes/driver.route");
const userRoute = require("./routes/user.route");
const passengerRoute = require("./routes/passenger.route");
const cookieParser = require("cookie-parser");
const vehicleRoutes = require("./routes/vehicleDashboardRoutes");
const driverRoutes = require("./routes/driverDashboardRoutes");
const tripRoutes = require("./routes/tripDashboardRoutes");
const issueRoutes = require("./routes/issueDashboardRoutes");
const countCompletedTripsRoute = require("./routes/countCompletedTripsRoute");
const passengerRouteReport = require("./routes/passengerReportRoutes");
const driverRouteReport = require("./routes/driverReportRoutes");
const vehicleRouteReport = require("./routes/vehicleReportRoutes");
const issueRouteReport = require("./routes/issueReportRoutes");

env.config({ path: './src/.env' }); // Explicitly specify the path to the .env file
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

connectDB();

const app = express();
//app.use(cors());

////add items
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
/////////////

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/vehicle", vehicleRoute);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/trips", countCompletedTripsRoute);
app.use("/api/passengers", passengerRouteReport);
app.use("/api/drivers", driverRouteReport);
app.use("/api/vehicles", vehicleRouteReport);
app.use("/api/issues", issueRouteReport);

app.use(errorHandler);

const port = process.env.PORT || 3001; // Fallback to 3000 if PORT not defined
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});