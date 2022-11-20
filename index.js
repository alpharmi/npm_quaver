const axios = require("axios")
const enums = require("./enums")

const BASE_URL = "https://api.quavergame.com/v1/"

function callApi(url) {
    return axios({
            method: "get",
            url:  BASE_URL + url, 
        })
        .then(response => response.data)
        .catch(err => {
            return err.response.data
        })
}

class QuaverApi {
    //Users
    async fetchUsers(user) {
        if (!user) {
            return Promise.reject(new Error("Parameter missing."))
        }

        const response = await callApi(`users/search/${user}`)
        return response.users
    }

    async fetchUser(user, strict = false) {
        if (!user) {
            return Promise.reject(new Error("Parameter missing."))
        }
        
        if (typeof user == "number") {
            const response = await callApi(`users/full/${user}`)
            return response
        } else {
            return new Promise(resolve => {
                this.fetchUsers(user).then(async data => {
                    if (data.length) {
                        var result = data[0]

                        if (strict) {
                            result = data.find(entry => entry.username.toLowerCase() == user.toLowerCase())
                        }
                        
                        if (result) {
                            const response = await callApi(`users/full/${result.id}`)
                            resolve(response)
                        } else {
                            resolve([])
                        }
                    }
                })
            })
        }
    }

    async fetchUserPlacements(userId, mode = enums.mode.key4, placements = enums.placements.all, limit = 10) {
        if (!userId || !mode) {
            return Promise.reject(new Error("Parameter missing."))
        }

        const promises = []

        placements.forEach(function(placement) {
            promises.push(
                callApi(`users/scores/${placement}?id=${userId}&mode=${mode}&limit=${limit}`).then(response => {
                    return response.scores
                })
            )
        })

        return Promise.all(promises).then(values => {
            return {recent: values[0] || [], best: values[1] || [], firstplaces: values[2] ||[]}
        })
    }
}

module.exports = {
    "quaver": new QuaverApi(),
    "enums": enums,
}