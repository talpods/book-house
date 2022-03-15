import bcrypt from "bcryptjs";

/**
 *
 * @param {string} password
 * @returns {string} new hashed password
 */
export const hashing = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    return hashed_password;
  } catch (err) {
    console.error(err.toString());
  }
};

/**
 *
 * @param {string} body_password String
 * @param {string} db_password String
 * @returns {boolean}
 */
export const check_password = async (body_password, db_password) => {
  try {
    const is_true = await bcrypt.compare(body_password, db_password);
    return is_true;
  } catch (err) {
    console.error(err.toString());
  }
};
