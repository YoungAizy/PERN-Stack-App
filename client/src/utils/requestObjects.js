export const newUser = (firstname,surname,email,password)=> ({firstname,surname,email,password});

export const profileSchema = (username,gender,d_o_b,city,user_role,companyName,companyPosition) => ({
    username,gender,d_o_b,city,user_role,companyName,companyPosition});

export const restaurantSchema = () => ({});

export const newReview = () => ({})