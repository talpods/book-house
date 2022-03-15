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
    CreateToken: (id, role, expireDate) => {
      return TokenService.createToken(id, role, expireDate);
    },
    VerifyToken: (token) => {
      return TokenService.verifyToken(token);
    },
  };
};
