import jwt from "jsonwebtoken";
import ApiError from "../common/error.js";
import Status from "../common/statusCode.js";

const secret = process.env.ACCESS_TOKEN_SECRET;

export default {
  /**
   *
   * @param {String} id
   * @param {String} role
   * @param {String} expireDate expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
   * @returns {String} token
   */
  createToken: function (id, role, expireDate) {
    return jwt.sign(
      {
        id: id.toString(),
        role: role,
      },
      secret,
      { expiresIn: expireDate }
    );
  },

  /**
   *
   * @param {String} token
   * @returns {Promise}
   */
  verifyToken: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) reject(new ApiError(err, Status.BAD_REQUEST));
        resolve(decodedToken.id);
      });
    });
  },
};
