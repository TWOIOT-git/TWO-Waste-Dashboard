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

exports.can_change_bin_full_threshold = (role) => {
  if(role === User_Roles.ADMIN || role === User_Roles.SUPER_ADMIN) {
    return true
  }

  return false
}

