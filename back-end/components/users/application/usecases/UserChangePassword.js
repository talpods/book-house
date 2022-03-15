import User from "../../enities/UserEntity.js";

/**
 * @param {UserRepository} UserRepository
 * @param {PasswordService} PasswordService
 * @param {AppError} AppError
 * @param {StatusCode} StatusCode
 */
export default (UserRepository, PasswordService, AppError, StatusCode) => {
  /**
   * @param {Object} user
   * @param {String} id
   * @param {String} user.oldPassword
   * @param {String} user.newPassword
   */
  return async function Execute(user) {
    const isUserThere = await UserRepository.GetUserById("users", user.id);

    if (isUserThere == undefined)
      throw new AppError("user not found", StatusCode.NOT_FOUND);

    const verfiyPassword = await PasswordService.CheckPassword(
      user.oldPassword,
      isUserThere.password
    );

    if (!verfiyPassword)
      throw new AppError("old password not match", StatusCode.FORBIDDEN);

    const newPassword = await PasswordService.Hashing(user.newPassword);
    const new_user = new User({
      first_name: isUserThere.first_name,
      last_name: isUserThere.last_name,
      email: isUserThere.email,
      password: newPassword,
      photo: isUserThere.photo,
      phone: isUserThere.phone,
    });

    await UserRepository.SaveUser(new_user);
  };
};
