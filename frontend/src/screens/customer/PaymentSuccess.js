import React from "react";

const PaymentSuccess = () => {
	return (
		<div className="w-full lg:w-cw  flex flex-col items-center h-screen mt-2 lg:pt-20 pt-10 px-4">
			<img
				className="lg:w-1/2 h-1/2 w-3/4 "
				src="assets/payment.svg"
				alt="payment-success-image"
				data-testid="payment-image"
			/>
			<div
				className=" mt-10 text-2xl font-bold text-mc"
				data-testid="payment-message"
			>
				Your Payment has been submitted successfully
			</div>
		</div>
	);
};

export default PaymentSuccess;
