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