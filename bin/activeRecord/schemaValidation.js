//receive an instance of a sqlObject and return errors for any inconsistancies between its schema and attributes
module.exports = instance => {
  const { schema, attributes } = instance;
  const errors = {};
  Object.keys(attributes).forEach(attr => {
    const constraints = schema[attr];
    const value = attributes[attr];

    if (!constraints && attr != "_id") {
      errors[attr] = `Unpermitted attribute ${attr} for ${instance.constructor.name}`;
    } else if (typeof constraints === "string") {
      if (typeof value != constraints && value != null) {
        errors[attr] = `Invalid data type for attribute ${attr}. Expected: ${constraints}, Got: ${typeof value}.`
      }
    } else if (typeof constraints === "object") {
      const { type, required } = constraints;
      if (typeof value != type) {
        errors[attr] = `Invalid data type for attribute ${attr}. Expected: ${constraints}, Got: ${typeof value}.`
      }
      if ((value === null || value === undefined) && required) {
        errors[attr] = `Missing required attribute ${attr}: ${type}.`
      }
    }
  });

  if (Object.keys(errors).length === 0) errors.empty = true;
  return errors;
}