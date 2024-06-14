export const checkSignupValidation = (fullName, email, password, contact) => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isValidPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isFullNameValid =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
      fullName
    );
  const isValidContact = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
    contact
  );

  if (!isFullNameValid) return "Full Name is invalid";
  if (!isValidEmail) return "Email is invalid";
  if (!isValidPassword) return "Password is invalid";
  if (!isValidContact) return "Contact is invalid";
};

export const checkSigninValidation = (email, password) => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  // const isValidPassword =
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidEmail) return "Email is invalid";
  // if (!isValidPassword) return "Password is invalid";
};
