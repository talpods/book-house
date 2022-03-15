/**
 * @param {PasswordService} PasswordService
 */
export default (PasswordService) => {
  if (
    PasswordService?.hashing == undefined ||
    PasswordService?.check_password == undefined
  )
    throw new Error("PasswordService not correct");

  return {
    Hashing: (password) => {
      return PasswordService.hashing(password);
    },
    CheckPassword: (incomePassword, dataBasePassword) => {
      return PasswordService.check_password(incomePassword, dataBasePassword);
    },
  };
};
