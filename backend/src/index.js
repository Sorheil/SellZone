import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

const __dirname = path.resolve();

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "Success" });
});

//make the app ready for the deployment
if (ENV.NODE_ENV === "production") {
	//in production mode, we need to serve our static files
	app.use(express.static(path.join(__dirname, "../admin/dist")));

	app.get("/{*any}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../admin", "dist", "index.html"));
	});
}

const startServer = async () => {
	await connectDB();
	app.listen(ENV.PORT, () => {
		console.log("Server is up and running");
	});
};

startServer();
