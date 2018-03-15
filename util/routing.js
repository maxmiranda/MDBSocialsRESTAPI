// HELPERS
function _getParamsByField(req, result, field) {
  for (var key in req[field]) {
    if (req[field][key] != null) {
      result[key] = req[field][key];
    }
  }
  return result;
}

function _aggregateParams(req) {
  var result = {};
  result = _getParamsByField(req, result, "query");
  result = _getParamsByField(req, result, "body");
  result = _getParamsByField(req, result, "params");
  return result;
}

// METHODS
function completeRequest(req, res, func) {
  console.log("got inside completeRequest routing");
  return req.getValidationResult().then(function(result) {
    console.log("inside validation result");
    if (!result.isEmpty()) {
      console.log("result is not empty <- completeRequest");
      res.status(400).json(result.array());
      return;
    }
    console.log("result is empty <- completeRequest");
    var allParams = _aggregateParams(req);
    console.log("just got allParams <- completeRequest");
    return func(allParams).then(function(result) {
      console.log("just ran func on allParams <- completeRequest");
      res.status(200).json(result);
    }).catch(function(error) {
      res.status(500).send(error.toString());
    });
  });
}

function rejectRequest(req, res) {
  return completeRequest(req, res, function(params) {
    return Promise.reject(new Error("Could not clasify your request."));
  });
}

// EXPORTS
module.exports.completeRequest = completeRequest;
module.exports.rejectRequest = rejectRequest;
