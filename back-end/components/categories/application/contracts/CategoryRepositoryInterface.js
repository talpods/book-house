/**
 * @param {DataBaseService} DataBaseService
 */
export default (DataBaseService) => {
  if (
    DataBaseService?.Save == undefined ||
    DataBaseService?.FindAll == undefined ||
    DataBaseService?.Delete == undefined
  )
    throw new Error("DataBaseService not correct");

  return {
    Add: (data) => {
      const category = {
        pk: "category",
        sk: `category#${data.title.replace(" ", "-")}`,
        title: data.title,
        slug: data.title.replace(" ", "-"),
        photo: data.photo,
      };
      return DataBaseService.Save(category);
    },
    GetAll: async () => {
      const res = await DataBaseService.FindAll("category", "category#");
      return res.items;
    },
    Delete: (slug) => {
      return DataBaseService.Delete("category", `category#${slug}`);
    },
  };
};
