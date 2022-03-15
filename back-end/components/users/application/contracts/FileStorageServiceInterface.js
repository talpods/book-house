/**
 * @param {FileStorageService} FileStorageService
 */
export default (FileStorageService) => {
  if (FileStorageService?.Save == undefined)
    throw new Error("FileStorageService not correct");

  return {
    SaveFile: (name, type) => {
      return FileStorageService.Save(name, type);
    },
  };
};
