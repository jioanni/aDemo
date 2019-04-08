const router = require('express').Router()
const secrets = require('../secrets')
const utility = require('../utility')
const axios = require('axios')

router.get('/', (req, res, next) => {
    res.send('boopleboop!')
})

router.post('/', (req, res, next) => {
      console.log(req.body.response)
      const payload = {
        "phone_number": req.body.phone,
        "name_first": req.body.name,
        "name_last": req.body.lastName,
        "email_address": req.body.email,
        "birth_date": req.body.dob,
        "address_line_1": req.body.address,
        "address_city": req.body.city,
        "address_state": req.body.state,
        "document_ssn": req.body.ssn,
        "address_postal_code": req.body.zip,
        "address_country_code": "US",
        "ip_address": req.ip,
        "iovation_blackbox": req.body.blackbox.iovation_blackbox
    }
    
    const token = utility.authGenerator(secrets.key, secrets.secret)
 
    const authHeaders = utility.headerGenerator(token, req.body.response)

    axios.post("https://sandbox.alloy.co/v1/evaluations", payload, {headers : authHeaders})
    .then((response) => {
        res.send(response.data.summary.outcome)
    })
    .catch(err => {
        res.send({'Error':  err.data, "code" : 500})
        })
    })

module.exports = router