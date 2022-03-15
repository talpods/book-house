import booksController from "../controllers/booksController.js";
import isAdmin from "../frameworks/web/admin.js";

import DataBaseService from "../frameworks/services/DataBaseService.js";
import {
  redisService,
  redisFlush,
} from "../frameworks/services/redisService.js";
import Validator from "../frameworks/joi/ValidatorService.js";

import booksRepositoryInterface from "../application/contracts/booksRepositoryInterface.js";

import BookSchema from "../frameworks/joi/schemas/BookSchema.js";
import Status from "../frameworks/common/statusCode.js";
import ApiError from "../frameworks/common/error.js";

export default {
  booksRepository: booksRepositoryInterface(DataBaseService),
  bookSchema: BookSchema,
  redisService: redisService,
  redisFlush: redisFlush,
  isAdmin: isAdmin,
  ValidationService: Validator,
  booksController: booksController,
  StatusCode: Status,
  AppError: ApiError,
};
