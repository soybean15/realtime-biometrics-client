const getValidations = () => {

  const isValidEmail = (val) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "Invalid email";
  };

  const isPasswordValid = (val) => {

    return val.length > 6 || 'Please enter mininum of 8 characters'
  };

  return {

    isValidEmail,
    isPasswordValid
  }


}

export default getValidations