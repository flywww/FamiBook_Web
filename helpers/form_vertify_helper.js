module.exports.isEmail = function isEmail(strEmail) {
  if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/)!= -1)
    return true;
  else
    return false;
}

//至少要數字字母混合，並且8-15碼
module.exports.isPassword = function isPassword(strPassword) {
  if (strPassword.search(/^(?=^.{8,15}$)(?=.*[A-Za-z])(?=.*[0-9])^.*$/)!= -1)
    return true;
  else
    return false;
}
