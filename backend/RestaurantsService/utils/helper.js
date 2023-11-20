import constants from "./constants/index.js";

/** CONTROLLER HELPER */
export const onSucess = (res,data) => res.json({status: constants.success,data});
export const onError = (res,error, command) => res.json({status: `${command} ${command===constants.upload ? constants.upload_failure:constants.onFailure}`, error});