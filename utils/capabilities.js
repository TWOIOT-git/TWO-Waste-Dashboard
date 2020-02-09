// import Amplify, { Auth, Logger } from 'aws-amplify';
//
// Amplify.Logger.LOG_LEVEL = 'DEBUG';
// const logger = new Logger('capabilities');

const User_Roles = {
  SUPER_ADMIN:   "SUPER_ADMIN",
  ADMIN:  "ADMIN",
  USER: "USER"
}


exports.can_add_user = (role) => {
  if(role === User_Roles.ADMIN || role === User_Roles.SUPER_ADMIN) {
    return true
  }

  return false
}

// exports.can_delete_user = async () => {
//   let user = await Auth.currentAuthenticatedUser()
//
//   logger.debug(user)
//
//   // let role =
//   // if(role === User_Roles.ADMIN || role === User_Roles.SUPER_ADMIN) {
//   //   return true
//   // }
//
//   return false
// }

exports.can_change_bin_full_threshold = (role) => {
  if(role === User_Roles.ADMIN || role === User_Roles.SUPER_ADMIN) {
    return true
  }

  return false
}

