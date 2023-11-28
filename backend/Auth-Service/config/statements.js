export default {
    FETCH_EMAIL_PREPARED:{
        name: "fetch_Email",
        text: "SELECT email FROM users WHERE email=$1",
        values: []
    },
    UPDATE_EMAIL: "UPDATE users SET email=$1 WHERE email=$2 returning email",
    FETCH_PASSWORD: "SELECT password FROM users WHERE email=$1",
    UPDATE_PASSWORD: "UPDATE users SET password = $1 WHERE email=$2",
    INSERT_USER: "INSERT INTO users(full_name,email,password,userId) valueS($1,$2,$3,$4) RETURNING *",
    UPDATE_USER:"UPDATE users SET full_name=$1, email=$2 WHERE email=$3 returning full_name, email",
    UPDATE_NAME: "UPDATE users SET full_name =$1 WHERE email=$2 returning full_name",
    FETCH_NAME:"SELECT full_name FROM user WHERE email=$1 returning name",
    FETCH_LOGIN_CREDENTIALS: "SELECT email,password, userId FROM users WHERE email=$1",
    DELETE_USER: "DELETE FROM users WHERE email=$1"

}

