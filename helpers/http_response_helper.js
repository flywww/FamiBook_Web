module.exports = (status ,message ,data) => {
  var response = {
    status: status,
   message: message,
      data: data
  };
  return response;
}
