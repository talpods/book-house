import bcrypt from "bcryptjs";

export default {
  /**
   *
   * @param {string} password
   * @returns {string} new hashed password
   */
  hashing: async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
  },

  /**
   *
   * @param {string} body_password String
   * @param {string} db_password String
   * @returns {boolean}
   */
  check_password: async (body_password, db_password) => {
    const is_true = await bcrypt.compare(body_password, db_password);
    return is_true;
  },
};
