import Category from "../../entities/CategoryEntity.js";

export default (CategoryRepository, TokenService, AppError, StatusCode) => {
  async function Execute(token, title, photo) {
    await TokenService.VerifyToken(token);

    if (!title || !photo)
      throw new AppError(
        "please include title and photo",
        StatusCode.BAD_REQUEST
      );

    const category = new Category(title, photo);
    return CategoryRepository.Add(category);
  }
  return {
    Execute,
  };
};
