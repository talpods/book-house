export default class TestDatabaseService {
  constructor() {
    this.categories = [];
  }

  Save = (data) => {
    this.categories.push(data);
    return true;
  };

  GetById = async (pk, sk) => {
    return this.categories.find((c) => c.pk === pk && c.sk === sk);
  };

  FindAll = async (pk, sk) => {
    const items = this.categories.filter(
      (c) => c.pk === pk && c.sk.startsWith(sk)
    );
    return { items: items };
  };

  Delete = async (pk, sk) => {
    const index = this.categories.findIndex((c) => c.pk === pk && c.sk === sk);
    this.categories.splice(index, 1);
    return true;
  };
}
