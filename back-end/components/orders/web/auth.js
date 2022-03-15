import jwt from "jsonwebtoken";
import ApiError from "./error.js";
import Status from "./statusCode.js";

export default (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader)
		throw new ApiError("authorization missing", Status.BAD_REQUEST);
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
		if (err) throw new ApiError("token expired", Status.FORBIDDEN);
		req.userId = decodedToken.id;
	});
	next();
};
