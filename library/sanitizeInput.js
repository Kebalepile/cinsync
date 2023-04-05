export default function sanitizeInput(input) {
  // remove any HTML tage.
  input = input.replace(/(<([^>]+)>)/gi, "");
  // remove any charectoers that chould be used in code injection.
  input = input.replace(/[&<>"'`=\/]/g, "");
  return input;
}
