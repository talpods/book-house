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
   * @param {String} user.first_name
   * @param {String} user.lastName
   * @param {String} user.email
   * @param {String} user.password
   * @param {String} user.photo
   */
  return async function Execute(user) {
    const id = `users#${user.email}`;
    const isFound = await UserRepository.GetUserById("users", id);

    if (isFound !== undefined)
      throw new AppError("email already taken", StatusCode.BAD_REQUEST);

    const password = await PasswordService.Hashing(user.password);
    const local_user = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password,
      photo: user?.photo,
    });

    return UserRepository.SaveUser(local_user);
  };
};
