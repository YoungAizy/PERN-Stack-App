
//allowed characters $.-_*+!, (?=\w{7,19})
// const passwordCheck = / (?![^@|&/^%#:="'[]{}()`~;\?<>\\]) (?=[.-_+*!,$])(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d+)/
const passwordCheck2 = /(?=\w{7,19})(?=\w*\W+)(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d+)/
export const checkPassword = (password)=>{
    return passwordCheck2.test(password);
}

const emailCheck =  /^\w+@\w+\.[a-zA-Z]{2,4}$/
export const checkEmail = email=> emailCheck.test(email);

const checkwhiteSpace = /\s+/
export const checkWhiteSpace = username => checkwhiteSpace.test(username);
const usernameCheck = /\w{4,20}/
export const checkUsername = username => usernameCheck.test(username);