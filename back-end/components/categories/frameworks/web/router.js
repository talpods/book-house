import asyncHandler from "../common/asyncHandler.js";
import admin from "../common/admin.js";
import ProjectDependencies from "../../configs/ProjectDependencies.js";
import CategoryController from "../../controllers/CategoryController.js";

const controller = CategoryController(ProjectDependencies);

export default (router) => {
  router.get("/", asyncHandler(controller.GetAllCategories));

  router.post("/", admin, asyncHandler(controller.AddNewCategory));

  router.delete("/:id", admin, asyncHandler(controller.DeleteCategory));

  return router;
};
