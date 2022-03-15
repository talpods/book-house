import SignUp from "../application/usecases/SignUp.js";
import SignIn from "../application/usecases/SignIn.js";
import GetUserInfo from "../application/usecases/GetUserInfo.js";
import UpdateUserInfo from "../application/usecases/UpdateUserInfo.js";
import ChangeUserPassword from "../application/usecases/UserChangePassword.js";

/**
 * @param {dependencies} dependencies
 */
export default (dependencies) => {
  const { ValidationService } = dependencies;
  const { SignUpSchema } = dependencies;
  const { UpdateUserSchema } = dependencies;
  const { PasswordSchema } = dependencies;
  const { LoginSchema } = dependencies;
  const { UserRepository } = dependencies;
  const { PasswordService } = dependencies;
  const { TokenService } = dependencies;
  const { StatusCode } = dependencies;
  const { AppError } = dependencies;
  const { FileStorageService } = dependencies;

  const signUp = SignUp(UserRepository, PasswordService, AppError, StatusCode);

  const updateUserInfo = UpdateUserInfo(UserRepository, AppError, StatusCode);

  const getUserInfo = GetUserInfo(
    UserRepository,
    TokenService,
    AppError,
    StatusCode
  );

  const signIn = SignIn(
    UserRepository,
    PasswordService,
    TokenService,
    AppError,
    StatusCode
  );

  const changeUserPassword = ChangeUserPassword(
    UserRepository,
    PasswordService,
    AppError,
    StatusCode
  );

  return {
    Registration: async ({ body }) => {
      const values = ValidationService(SignUpSchema)(body);
      await signUp(values);
      return [StatusCode.CREATED, "user created"];
    },

    Login: async ({ body }) => {
      const { email, password } = ValidationService(LoginSchema)(body);
      const response = await signIn(email, password);
      return [StatusCode.OK, response];
    },

    UserInfo: async ({ headers }) => {
      const authHeader = headers["authorization"];
      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );

      const token = authHeader.split(" ")[1];
      const user = await getUserInfo(token);
      return [StatusCode.OK, user];
    },

    UpdateUserInformation: async ({ headers, body }) => {
      const authHeader = headers["authorization"];
      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );

      const token = authHeader.split(" ")[1];
      const id = await TokenService.VerifyToken(token);
      const user = ValidationService(UpdateUserSchema)(body);
      user.id = id;
      await updateUserInfo(user);
      return [StatusCode.OK, "user info updated"];
    },

    UpdateUserPassword: async ({ headers, body }) => {
      const authHeader = headers["authorization"];
      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );

      const token = authHeader.split(" ")[1];
      const id = await TokenService.VerifyToken(token);
      const user = ValidationService(PasswordSchema)(body);
      user.id = id;
      await changeUserPassword(user);
      return [StatusCode.OK, "user password updated"];
    },

    UploadImage: async ({ body, headers }) => {
      console.log("here");
      const authHeader = headers["authorization"];

      if (!authHeader)
        throw new AppError(
          "authorization header is missing",
          StatusCode.BAD_REQUEST
        );

      const { name, type } = body;
      const url = await FileStorageService.SaveFile(name, type);

      return [StatusCode.CREATED, { url }];
    },
  };
};
