import Controller from "./categoryController.js";

export default (router) => {
  // get all categories
  router.get("/", (req, res) => {
    Controller.GetAllCategories(req, res);
  });

  // add new category
  router.post("/", (req, res) => {
    Controller.AddNewCategory(req, res);
  });

  // add new category
  router.delete("/:slug", (req, res) => {
    Controller.DeleteCategory(req, res);
  });
  return router;
};
