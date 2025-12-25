import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/ingest.js";
import { serve } from "inngest/express";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

//routes
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();

const __dirname = path.resolve();

//parse json request body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(clerkMiddleware());

// Expose Inngest endpoint: this mounts all Inngest functions under /api/ingest.
// Inngest will call this route to trigger our server-side functions
// (e.g. reacting to Clerk events like user.created or user.deleted).
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/api/health", adminRoutes, (req, res) => {
	res.status(200).json({ message: "Success" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

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
