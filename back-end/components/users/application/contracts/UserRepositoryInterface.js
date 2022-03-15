/**
 * @param {DataBaseService} DataBaseService
 */
export default (DataBaseService) => {
  if (
    DataBaseService?.Save == undefined ||
    DataBaseService?.GetById == undefined
  )
    throw new Error("DataBaseService not correct");

  return {
    SaveUser: (data) => {
      return DataBaseService.Save(data);
    },
    GetUserById: (pk, sk) => {
      return DataBaseService.GetById(pk, sk);
    },
  };
};
