const app = require("./index");


const wshservice = (request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`;
  }
  return app(request, response);
};

export { wshservice };
