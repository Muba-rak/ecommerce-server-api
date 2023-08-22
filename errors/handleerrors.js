const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.message === "fill") {
    err.message = "Please Fill all input fields";
    return { error: err.message };
  }
  if (err.message === "no match") {
    err.message = "Invalid Credentials";
    return { error: err.message };
  }
  if (err.message === "no user") {
    errors.email = "Email adrress is not registered";
    return errors;
  }
  if (err.message === "wrong") {
    errors.email = "Invalid email or password";
    errors.password = "Invalid email or password";
    return errors;
  }
  if (err.code === 11000) {
    errors.email = "Email adrress is already in use";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = handleErrors;
