import axiosInstance from "./axios";

export const productApi = {
	getAll: async () => {
		const { data } = await axiosInstance.get("/admin/products");
		return data;
	},

	create: async (formData: FormData) => {
		const { data } = await axiosInstance.post("/admin/products", formData);
		return data;
	},

	update: async ({ id, formData }: { id: string; formData: FormData }) => {
		const { data } = await axiosInstance.put(`/admin/products/${id}`, formData);
		return data;
	},

	delete: async (productId: string) => {
		const { data } = await axiosInstance.delete(`/admin/products/${productId}`);
		return data;
	},
};

export const orderApi = {
	getAll: async () => {
		const { data } = await axiosInstance.get("/admin/orders");
		return data;
	},

	updateStatus: async ({ orderId, status }: { orderId: number; status: string }) => {
		const { data } = await axiosInstance.patch(`/admin/orders/${orderId}/status`, { status });
		return data;
	},
};

export const statsApi = {
	getDashboard: async () => {
		const { data } = await axiosInstance.get("/admin/stats");
		return data;
	},
};

export const customerApi = {
	getAll: async () => {
		const { data } = await axiosInstance.get("/admin/customers");
		return data;
	},
};
