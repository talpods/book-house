import DataBaseService from "../frameworks/services/DataBaseService.js";
import TestDataBaseService from "../frameworks/services/TestDatabaseService.js";
import TokenService from "../frameworks/services/TokenService.js";

import CategoryRepositoryInerface from "../application/contracts/CategoryRepositoryInterface.js";
import TokenServiceInterface from "../application/contracts/TokenServiceInterface.js";

import Status from "../frameworks/common/statusCode.js";
import ApiError from "../frameworks/common/error.js";

export default {
  CategoryRepository: CategoryRepositoryInerface(
    process.env.NODE_ENV === "test"
      ? new TestDataBaseService()
      : DataBaseService
  ),
  TokenService: TokenServiceInterface(TokenService),
  StatusCode: Status,
  AppError: ApiError,
};
