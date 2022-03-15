export default class Book {
  constructor({
    title,
    author,
    category,
    price,
    photo,
    description,
    quantity,
    slug,
    publish_date,
  }) {
    this.pk = "books";
    this.sk = `books#${slug}`;
    this.lsi1pk = "books";
    this.lsi1sk = `books#${category}#${slug}`;
    this.lsi2pk = "books";
    this.lsi2sk = `books#${title}`;
    this.title = title;
    this.author = author;
    this.price = price + "";
    this.category = category;
    this.photo = photo || "";
    this.description = description;
    this.quantity = quantity + "";
    this.publish_date = new Date(publish_date).toLocaleDateString();
    this.slug = slug;
  }
}
