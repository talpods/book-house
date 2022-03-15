import Category from "../../entities/CategoryEntity.js";

export default (CategoryRepository) => {
  async function Execute() {
    return CategoryRepository.GetAll();
  }
  return {
    Execute,
  };
};
