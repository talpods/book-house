import User from "../../enities/UserEntity.js";

/**
 * @param {UserRepository} UserRepository
 * @param {AppError} AppError
 * @param {StatusCode} StatusCode
 */
export default (UserRepository, AppError, StatusCode) => {
  /**
   * @param {Object} user
   * @param {String} id
   * @param {String} user.first_name
   * @param {String} user.lastName
   * @param {String} user.email
   * @param {String} user.password
   * @param {String} user.photo
   */
  return async function Execute(user) {
    const isUserThere = await UserRepository.GetUserById("users", user.id);

    if (isUserThere == undefined)
      throw new AppError("user not found", StatusCode.NOT_FOUND);

    const new_user = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: isUserThere.email,
      password: isUserThere.password,
      photo: user.photo,
      phone: user.phone,
    });

    return UserRepository.SaveUser(new_user);
  };
};
