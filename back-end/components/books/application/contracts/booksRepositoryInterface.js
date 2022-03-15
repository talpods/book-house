/**
 * @param {DataBaseService} DataBaseService
 */
export default (DataBaseService) => {
  if (
    DataBaseService?.Save == undefined ||
    DataBaseService?.Find == undefined ||
    DataBaseService?.DeleteBySlug == undefined ||
    DataBaseService?.FindOneById == undefined ||
    DataBaseService?.getCountByGsi == undefined ||
    DataBaseService?.getCountByPK == undefined ||
    DataBaseService?.FindByCategory == undefined
  )
    throw new Error("DataBaseService not correct");

  return {
    SaveOrUpdateBook: (data) => {
      return DataBaseService.Save(data);
    },
    FindSingleBook: (pk, sk) => {
      return DataBaseService.FindOneById(pk, sk);
    },
    FindAllBooks: (pk, sk, limit, last) => {
      return DataBaseService.Find(pk, sk, limit, last);
    },
    FindBooksByCategory: (pk, sk, limit, last, indexName) => {
      return DataBaseService.FindByCategory(pk, sk, limit, last, indexName);
    },
    DeleteBook: (pk, sk) => {
      return DataBaseService.DeleteBySlug(pk, sk);
    },
    GetCountByPk: (pk, sk) => {
      return DataBaseService.getCountByPK(pk, sk);
    },
    GetCountByGsi: (pk, sk, indexName) => {
      return DataBaseService.getCountByGsi(pk, sk, indexName);
    },
  };
};
