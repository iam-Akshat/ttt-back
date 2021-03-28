const express = require('express')
const { validateRollNums } = require('./helpers/validate')
const { getResult } = require('./api/getResult')
const app = express()

app.use(express.urlencoded({ extended: true }))


app.get('/api/rollnums', async (req, res) => {
    const arrayString = req.query.rollnums
    if (validateRollNums(arrayString)) {
        const validNumsArray = arrayString.split(',').filter(el => el.length > 0).map(num => +num);
        const { resultArray, error } = await getResult(validNumsArray)
        if (error) {
            return res.status(404).json({ error: 'API error' })
        } else {
            return res.json({ validNumsArray, resultArray })
        }
    } else {
        return res.status(400).json({ message: 'Input can only have numbers and commas' })
    }

})
app.listen(process.env.PORT || 3001, () => {
    console.log('server started');
})