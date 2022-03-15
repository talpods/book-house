/**
 * @param {UserRepository} UserRepository
 * @param {PasswordService} PasswordService
 * @param {TokenService} TokenService
 * @param {AppError} AppError
 * @param {StatusCode} StatusCode
 */
export default (
  UserRepository,
  PasswordService,
  TokenService,
  AppError,
  StatusCode
) => {
  /**
   * @param {String} email
   * @param {String} password
   */
  return async function Execute(email, password) {
    const id = `users#${email}`;
    const user = await UserRepository.GetUserById("users", id);
    if (user == undefined)
      throw new AppError("email not registered", StatusCode.NOT_FOUND);

    const isValid = await PasswordService.CheckPassword(
      password,
      user.password
    );
    if (!isValid)
      throw new AppError("credentials wrong", StatusCode.BAD_REQUEST);

    const token = await TokenService.CreateToken(id, user.role, "7d");
    return {
      token,
      email: email,
      role: user.role,
      sk: user.sk,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      photo: user.photo,
    };
  };
};
