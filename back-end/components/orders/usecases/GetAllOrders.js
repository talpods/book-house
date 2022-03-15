import { find } from "../Repositories/ddb.js";

export default async (limit, last) => {
	const data = await find("orders", "orders#", limit, last);
	return data;
};
