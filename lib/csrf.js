const Token = require("csrf");
const secret = process.env.CSRF_SECRET;
const token = new Token();

/**
 * @returns {String}
 */
export function getToken() {
  return token.create(secret);
}

/**
 *
 * @param {String} tok
 * @returns {Boolean}
 */
export function verifyToken(tok) {
  return token.verify(secret, tok);
}
