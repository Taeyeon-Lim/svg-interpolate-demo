/**
 * @param condition true to throw an error, false to do nothing
 */
function throwError(message: string, condition: boolean = true) {
  if (condition) throw new Error(message);
}

export { throwError };
