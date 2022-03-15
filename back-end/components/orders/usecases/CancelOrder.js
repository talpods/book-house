import { Delete } from "../Repositories/ddb.js";
export default async (id) => {
	const respone = await Delete("orders", `orders#${id}`);
	return respone;
};
