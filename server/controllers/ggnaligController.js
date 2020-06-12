const axios = require('axios')

class ggnaligController {
    static getData(req,res, next){
        let q = req.params.query
        let apiKey = process.env.API_NEWS
        axios.get(`https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`)
        .then(news => {
            let temp = []
            for (let i = 0; i < 10; i++) {
                let idx = (i * 2) - 1 
                if (i === 0) idx = 0
                if (temp.includes(news.data.articles[idx].title)) {
                    continue
                } else {
                    temp.push(news.data.articles[idx])
                }
            }
            res.status(200).json({results: temp})
        })
        .catch(function (error) {
            error.msg = 'News API is currently unavailable'
            next(error)
        })
    }
}

module.exports = ggnaligController