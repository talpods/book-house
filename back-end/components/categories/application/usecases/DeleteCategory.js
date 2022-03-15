import Category from "../../entities/CategoryEntity.js";

export default (CategoryRepository, TokenService, AppError, StatusCode) => {
  async function Execute(token, id) {
    await TokenService.VerifyToken(token);

    if (!id) throw new AppError("please include id", StatusCode.BAD_REQUEST);

    return CategoryRepository.Delete(id);
  }
  return {
    Execute,
  };
};
