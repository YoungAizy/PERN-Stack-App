export const newUser = (firstname,surname,email,password)=> ({firstname,surname,email,password});

export const updateProfile = (username,city,d_o_b,gender)=> ({username,city,d_o_b,gender})

export const profileSchema = (username,gender,d_o_b,city,
    user_type,companyName,companyPosition) => ({username,gender,d_o_b,city,user_type,companyName,companyPosition});

export const restaurantSchema = (name, addr_, price, description, createdby, tel, tel_ext, email, web, city) => {
    return {name, addr_, price, description, createdby, tel, tel_ext, email, web, city}
};

export const newReview = () => ({})