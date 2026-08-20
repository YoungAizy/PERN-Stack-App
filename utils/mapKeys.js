const reviewsKeyMap ={
    reviewer_username: "username",
    review_text: "review"
}

export const mapNewkeys = (object)=>{
    const updatedObject = Object.fromEntries(
        Object.entries(object).map(([key, value]) => [reviewsKeyMap[key] || key, value])
      );
    return updatedObject;
}

export const internalColumns = {
    name: "name",
    description:"description",
    price:"price_range",
    location: "str_sub",
    city: "city",
    country: "country",
    phone:"telephone",
    phone_ext:"tel_ext",
    email:"email_addr",
    website:"web_addr",
    restaurant: "public_id"
}