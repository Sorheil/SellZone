/**
 * Types definitions for SellZone application
 * This file contains TypeScript type definitions for all data objects
 */

export interface Address {
	label: string;
	fullName: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: string;
	isDefault?: boolean;
}

export interface User {
	_id: string;
	email: string;
	name: string;
	imageUrl?: string;
	clerkId: string;
	addresses?: Address[];
	wishlist?: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	images: string[];
	averageRating: number;
	totalReviews: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CartItem {
	product: string;
	quantity?: number;
}

export interface Cart {
	_id: string;
	user: string;
	clerkId: string;
	items: CartItem[];
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItem {
	product: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export interface ShippingAddress {
	fullName: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: string;
}

export interface PaymentResult {
	id?: string;
	status?: string;
}

export interface Order {
	_id: string;
	user: string;
	clerkId: string;
	orderItems: OrderItem[];
	shippingAddress: ShippingAddress;
	paymentResult?: PaymentResult;
	totalPrice: number;
	status?: "pending" | "shipped" | "delivered";
	deliveredAt?: Date;
	shippedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface Review {
	_id: string;
	productId: string;
	userId: string;
	orderId: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface DashboardStats {
	totalRevenue: number;
	totalOrders: number;
	totalCustomers: number;
	totalProducts: number;
}
