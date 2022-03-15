export default class User {
  constructor(user) {
    this.pk = "users";
    this.sk = `users#${user.email}`;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone || "";
    this.role = "user";
    this.photo =
      user.photo || "https://bookhouse.s3.eu-west-1.amazonaws.com/149071.png";
  }
}
