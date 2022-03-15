import UserController from "../controllers/UserController.js";

import FileStorageService from "../frameworks/services/FileStorageService.js";
import DataBaseService from "../frameworks/services/DataBaseService.js";
import PasswordService from "../frameworks/services/PasswordService.js";
import TokenService from "../frameworks/services/TokenService.js";
import Validator from "../frameworks/joi/ValidatorService.js";

import UserRepositoryInterface from "../application/contracts/UserRepositoryInterface.js";
import PasswordServiceInterface from "../application/contracts/PasswordServiceInterface.js";
import TokenServiceInterface from "../application/contracts/TokenServiceInterface.js";
import FileStorageServiceInterface from "../application/contracts/FileStorageServiceInterface.js";

import UserSchema from "../frameworks/joi/schemas/UserSchema.js";
import UpdateUserSchema from "../frameworks/joi/schemas/UpdateUserSchema.js";
import SigninSchema from "../frameworks/joi/schemas/SigninSchema.js";
import PasswordSchema from "../frameworks/joi/schemas/PasswordSchema.js";
import Status from "../frameworks/common/statusCode.js";
import ApiError from "../frameworks/common/error.js";

export default {
  UserRepository: UserRepositoryInterface(DataBaseService),
  PasswordService: PasswordServiceInterface(PasswordService),
  TokenService: TokenServiceInterface(TokenService),
  FileStorageService: FileStorageServiceInterface(FileStorageService),
  SignUpSchema: UserSchema,
  UpdateUserSchema: UpdateUserSchema,
  LoginSchema: SigninSchema,
  PasswordSchema: PasswordSchema,
  ValidationService: Validator,
  UserController: UserController,
  StatusCode: Status,
  AppError: ApiError,
};
