import Repo from "./categoryRepo.js";
export default {
  GetAllCategories: async () => {
    return Repo.GetAllCategories();
  },
  AddNewCategory: async (category) => {
    return Repo.AddNewCategory(category);
  },
  DeleteCategory: async (slug) => {
    return Repo.DeleteCategory(slug);
  },
};
