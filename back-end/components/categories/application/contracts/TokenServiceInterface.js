/**
 * @param {TokenService} TokenService
 */
export default (TokenService) => {
  if (
    TokenService?.createToken == undefined ||
    TokenService?.verifyToken == undefined
  )
    throw Error("TokenService not correct");

  return {
    CreateToken: (id, expireDate) => {
      return TokenService.createToken(id, expireDate);
    },
    VerifyToken: (token) => {
      return TokenService.verifyToken(token);
    },
  };
};
