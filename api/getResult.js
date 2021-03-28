const axios = require('axios')
const getResult = async (array) => {
    let error = null
    let resultArray = []
    const baseURL = 'https://terriblytinytales.com/testapi?rollnumber='

    resultArray = await Promise.all(array.map(async (num) => {
        const endpoint = `${baseURL}${num}`
        try {
            const result = await axios.get(endpoint)
            return result.data
        } catch (err) {
            error = err.response.statusText
            console.log(err.response.statusText);
            return Promise.resolve(error)
        }

    }))
    return { resultArray, error }

}

module.exports = { getResult }