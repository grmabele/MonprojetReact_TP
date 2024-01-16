export const emailValidator = email => {
     const re = /\S+@\S+\.\S+/;
     if (!email || email.lengh <= 0) return true;
     if (!re.test(email)) return true;
     return false;
};

export const passwordValidator = password => {
    if (!password || password.length <= 0) return true;
    return false;
  };
  
  export const nameValidator = name => {
    if (!name || name.length <= 0) return true;
    return false;
  };
  