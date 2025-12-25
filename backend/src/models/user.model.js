import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
	label: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	streetAddress: {
		//Rue de la Liberté, Quartier Deido
		type: String,
		required: true,
	},
	city: {
		//ville (ex: "Douala")
		type: String,
		required: true,
	},
	state: {
		//région (ex: "Littoral")
		type: String,
		required: true,
	},
	zipCode: {
		// code postal (ex: "75001", "69000")
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	isDefault: {
		type: Boolean,
		default: false,
	},
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},

		imageUrl: {
			type: String,
			default: "",
		},
		clerkId: {
			type: String,
			unique: true,
			required: true,
		},
		addresses: [addressSchema],
		wishlist: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
