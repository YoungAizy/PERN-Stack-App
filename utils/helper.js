const keyMap ={
    d_o_b: "dob",
    user_role: "account_type",
    companyName: "company",
    companyPosition: "position",
    gender: "sex",
    userId: "userid"
}

export const mapNewkeys = (object)=>{
    const updatedObject = Object.fromEntries(
        Object.entries(object).map(([key, value]) => [keyMap[key] || key, value])
      );
    return updatedObject;
}