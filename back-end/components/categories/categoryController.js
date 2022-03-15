import Services from "./categoryServices.js";
import Status from "../../utility/statusCode.js";

export default {
  // get all categories
  GetAllCategories: async (req, res) => {
    const { data, error } = await Services.GetAllCategories();
    if (!error) res.json(data);
    else res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: "server error" });
  },

  // add new category
  AddNewCategory: async (req, res) => {
    if (!req.body.title || !req.body.photo)
      res
        .status(Status.BAD_REQUEST)
        .json({ msg: "please include title and photo" });
    else {
      const { data, error } = await Services.AddNewCategory({
        title: req.body.title,
        photo: req.body.photo,
      });

      if (!error) res.status(Status.CREATED).json(data);
      else
        res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: "server error" });
    }
  },

  // delete category
  DeleteCategory: async (req, res) => {
    const { error } = await Services.DeleteCategory(req.params.slug);

    if (!error)
      res.status(Status.NO_CONTENT).json({ msg: "deleted successfully" });
    else res.status(Status.INTERNAL_SERVER_ERROR).json({ msg: "server error" });
  },
};
