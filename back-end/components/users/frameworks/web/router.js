import asyncHandler from "../common/asyncHandler.js";
import ProjectDependencies from "../../configs/ProjectDependencies.js";
import UserController from "../../controllers/UserController.js";

const controller = UserController(ProjectDependencies);

export default (router) => {
  router.get("/", asyncHandler(controller.UserInfo));

  router.post("/", asyncHandler(controller.Registration));

  router.put("/", asyncHandler(controller.UpdateUserInformation));

  router.put("/change-password", asyncHandler(controller.UpdateUserPassword));

  router.post("/sign-in", asyncHandler(controller.Login));

  router.post("/upload-img", asyncHandler(controller.UploadImage));

  return router;
};
