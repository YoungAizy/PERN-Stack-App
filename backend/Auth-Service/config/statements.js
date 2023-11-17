export default {
    FETCH_EMAIL:{
        name: "fetch_Email",
        text: "SELECT email FROM users WHERE email=$1",
        values: []
    },
    UPDATE_EMAIL: "",
    FETCH_PASSWORD: "SELECT password FROM users WHERE id=$1",
    UPDATE_PASSWORD: "",
    INSERT_USER: "INSERT INTO user(name,email,password) valueS($1,$2,$3) RETURNING *",
    UPDATE_USER:"",
    UPDATE_NAME: "",
    FETCH_USER:"SELECT name,email FROM user WHERE id=$1",
    FETCH_NAME: "SELECT username FROM users WHERE name=$1",

}

