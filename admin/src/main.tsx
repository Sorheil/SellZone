import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	sendDefaultPii: true,
	enableLogs: true,
	integrations: [Sentry.replayIntegration()],
	replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ClerkProvider>
		</BrowserRouter>
	</StrictMode>
);
