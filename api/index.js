const router = require('express').Router()
const secrets = require('../secrets')
const utility = require('../utility')
const axios = require('axios')

router.get('/', (req, res) => {
    res.send('boopleboop!')
})

router.post('/reviews', (req, res) => {
 
    const token = utility.authGenerator(secrets.key, secrets.secret)
 
    const authHeaders = utility.headerGenerator(token, req.body.response)

    axios.get(`https://sandbox.alloy.co/v1/entities/${req.body.token}/reviews`, {headers : authHeaders})
    .then((response) => res.send(response.data))
    .catch((err) => res.send({'Error':  err.data, "code" : 500}))

})

router.post('/', (req, res) => {
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
        if(response.data.status_code === 200) {
            res.send({"questions" : response.data.prompts.answers.questions,
                      "eval_token" : response.data.evaluation_token})
        } else {
            res.send({"outcome" : response.data.summary.outcome,
                      "eval_token" : response.data.evaluation_token,
                      "entity_token" : response.data.entity_token})
        }
    })
    .catch(err => {
        res.send({'Error':  err.data, "code" : 500})
        })
    })



    router.patch('/', (req, res) => {

        const answers = req.body
        
        const payload = {"answers": []}

        // eslint-disable-next-line no-undef
        for (const key in answers){
            // eslint-disable-next-line no-undef
            if(key != ("eval") && key != ("status")){
                payload.answers.push({"question_id": key, "answer_id": req.body[key]})
            }
        }

        const token = utility.authGenerator(secrets.key, secrets.secret)
 
        const authHeaders = utility.headerGenerator(token, req.body.response)

        axios.patch(`https://sandbox.alloy.co/v1/evaluations/${req.body.eval}`, payload, {headers: authHeaders})
        .then(response => res.send(response.data.summary.outcome))
        .catch(err => res.send({'Error':  err.data, "code" : 500}))
    })

module.exports = router