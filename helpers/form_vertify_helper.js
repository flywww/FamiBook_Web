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


module.exports.isNumber = function isNumber(strNumber) {
  if (strNumber.search(/^[0-9]*$/)!= -1)
    return true;
  else
    return false;
}

module.exports.isUrl = function isUrl(strUrl) {
  if (strUrl.search(/^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/)!= -1)
    return true;
  else
    return false;
}

module.exports.isAlphabetAndNumber = function isAlphabetAndNumber(strAlphabetAndNumber) {
  if (strAlphabetAndNumber.search(/^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/)!= -1)
    return true;
  else
    return false;
}

module.exports.isCreditCardNumber = function isCreditCardNumber(strCreditCardNumber) {
  if (strCreditCardNumber.search(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/)!= -1)
    return true;
  else
    return false;
}
