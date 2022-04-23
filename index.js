const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Running Node Server Successfully 🚀 ')
})

app.listen(port, () => {
    console.log(`Running at Port : ${port}`);
})