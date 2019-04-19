const secrets = require('./secrets')

const authGenerator = (key, secret) => {
  const encoded = Buffer.from(key+":"+secret).toString('base64')

  return encoded
}

const headerGenerator = (token, status) => {
  let headerObject = {"Authorization" : "Basic " +token}
  if (status === "denied"){
    headerObject["Alloy-Entity-Token"] = secrets.declineToken
  } else if(status === "manual") {
    headerObject["Alloy-Entity-Token"] = secrets.manualToken
  } else if(status === "questions"){
    headerObject["Alloy-Entity-Token"] = secrets.questionsToken
  }

  return headerObject

}




module.exports = {authGenerator, headerGenerator}