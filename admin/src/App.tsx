//import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
//pages
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import CustomersPage from "./pages/CustomersPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";

import { useAuth } from "@clerk/clerk-react";
import PageLoader from "./components/PageLoader.tsx";

export default function App() {
	const { isSignedIn, isLoaded } = useAuth();
	if (!isLoaded) return <PageLoader />;
	return (
		<Routes>
			<Route
				path="/login"
				element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />}
			/>

			<Route
				path="/"
				element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />}
			>
				<Route
					index
					element={<Navigate to={"dashboard"} />}
				/>
				<Route
					path="dashboard"
					element={<DashboardPage />}
				/>
				<Route
					path="products"
					element={<ProductsPage />}
				/>
				<Route
					path="orders"
					element={<OrdersPage />}
				/>
				<Route
					path="customers"
					element={<CustomersPage />}
				/>
			</Route>
		</Routes>
	);
}
