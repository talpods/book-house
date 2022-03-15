import AddNewCategory from "../application/usecases/AddNewCategory.js";
import GetAllCategories from "../application/usecases/GetAllCategories.js";
import DeleteCategory from "../application/usecases/DeleteCategory.js";

/**
 * @param {dependecies} dependecies
 */
export default (dependecies) => {
  const { CategoryRepository } = dependecies;
  const { TokenService } = dependecies;
  const { StatusCode } = dependecies;
  const { AppError } = dependecies;

  return {
    GetAllCategories: async () => {
      const getAllCategoriesCommand = GetAllCategories(CategoryRepository);
      const res = await getAllCategoriesCommand.Execute();
      return [StatusCode.OK, res];
    },

    AddNewCategory: async ({ headers, body }) => {
      const authHeader = headers["authorization"];
      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );
      const token = authHeader.split(" ")[1];

      const AddNewCategoryCommand = AddNewCategory(
        CategoryRepository,
        TokenService,
        AppError,
        StatusCode
      );
      await AddNewCategoryCommand.Execute(token, body.title, body.photo);
      return [StatusCode.CREATED, { msg: "added successfully" }];
    },

    DeleteCategory: async ({ headers, params }) => {
      const authHeader = headers["authorization"];
      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );
      const token = authHeader.split(" ")[1];

      const DeleteCategoryCommand = DeleteCategory(
        CategoryRepository,
        TokenService,
        AppError,
        StatusCode
      );
      await DeleteCategoryCommand.Execute(token, params.id);
      return [StatusCode.NO_CONTENT, null];
    },
  };
};
