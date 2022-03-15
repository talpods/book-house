import { getWithIndex } from "../Repositories/ddb.js";

export default async (id, limit, last) => {
	const data = await getWithIndex(
		"lsi1-index",
		"orders",
		`orders#${id}`,
		limit,
		last
	);

	return data;
};
