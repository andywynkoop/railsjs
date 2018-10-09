//receive an instance of a sqlObject and return errors for any inconsistancies between its schema and attributes
module.exports = async instance => {
  const { schema, attributes } = instance;
  // create an empty errors object
  const errors = {};
  // iterate through all defined attributes on the instance
  Object.keys(attributes).forEach(async attr => {
    // get constraints from schema
    const constraints = schema[attr];
    // get value of attribute
    const value = attributes[attr];

    if (!constraints && attr != "_id") {
      // check if there are constraints provided for the attribute
      // if not, the attr isn't part of the schema
      // id is not expected
      errors[attr] = `Unpermitted attribute ${attr} for ${instance.constructor.name}`;
    } else if (constraints.constructor.name === "String") {
      // Assume that if contraints is a string, it is only specifying the data type
      if (value.constructor.name != constraints && value != null) {
        errors[attr] = `Invalid data type for attribute ${attr}. Expected: ${constraints}, Got: ${typeof value}.`
      }
    } else if (constraints.constructor.name === "Object") {
      // if constraints is an object, destructure the type, required, and unique keys
      const { type, required, unique } = constraints;
      if (value.constructor.name != type) {
        // check the name of the value's constructor to test type
        errors[attr] = `Invalid data type for attribute ${attr}. Expected: ${constraints}, Got: ${typeof value}.`
      }
      if ((value === null || value === undefined) && required) {
        // flag an error if the value is not provided but specified as required
        errors[attr] = `Missing required attribute ${attr}: ${type}.`
      }
      if (unique) {
        // if unique is specified, try to find an instance with the same value and flag an error if found
        const existingEntry = await instance.constructor.findBy({ [attr]: value});
        if (existingEntry) errors[attr] = `Non-unique validation failed: ${instance.constructor.name} with ${attr} ${value} already exists.`
      }
    }
  });
  // set 'empty: true' on errors object to make it easier to check if it's empty
  if (Object.keys(errors).length === 0) errors.empty = true;
  return errors;
}