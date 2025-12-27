import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function RootLayout() {
	const queryClient = new QueryClient();

	return (
		<ClerkProvider tokenCache={tokenCache}>
			<QueryClientProvider client={queryClient}>
				<Stack screenOptions={{ headerShown: false }} />
			</QueryClientProvider>
		</ClerkProvider>
	);
}
