/**
 * @param {UserRepository} UserRepository
 * @param {TokenService} TokenService
 * @param {AppError} AppError
 * @param {StatusCode} StatusCode
 */
export default (UserRepository, TokenService, AppError, StatusCode) => {
  /**
   * @param {String} token
   */
  return async function Execute(token) {
    const id = await TokenService.VerifyToken(token);
    const user = await UserRepository.GetUserById("users", id);

    if (user == undefined)
      throw new AppError("user not found", StatusCode.NOT_FOUND);

    return {
      role: user.role,
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      photo: user?.photo,
      phone: user?.phone,
      sk: user.sk,
    };
  };
};
