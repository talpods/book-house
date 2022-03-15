export default class Order {
	constructor(id, user, shipping, products, total_price) {
		this.pk = "orders";
		this.sk = `orders#${id}`;
		this.lsi1pk = "orders";
		this.lsi1sk = `orders#${user}`;
		this.order_id = id;
		this.user = user;
		this.created_at = new Date().toDateString();
		this.status = "pending";
		this.total_price = `${total_price}`;
		this.shipping_address = shipping;
		this.products = products;
	}
}
