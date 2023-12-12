export function errorCreator(message, code) {
  const err = new Error(message);
  err.code = code;
  return err;
}
