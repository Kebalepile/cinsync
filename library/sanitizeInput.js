/**
 * 
 * @param {*} input 
 * @description Uses regular expression to remove any HTML tags from input, then remove any charecters
 * that are commonly used in code injections.
 * @returns 
 */
export default function sanitizeInput(input) {
  // remove any HTML tage.
  input = input.replace(/(<([^>]+)>)/gi, "");
  // remove any charectoers that chould be used in code injection.
  input = input.replace(/[&<>"'`=\/]/g, "");
  return input;
}
