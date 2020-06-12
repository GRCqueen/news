const axios = require('axios')
const { response } = require('express')

class OldController {
    static getOldNews(req, res, next) {
        const { query } = req.params
        axios.get(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${query}&format=json`)
            .then(results => {
                let empty = {
                    name: "NoResults",
                    msg: 'No articles is found try to use a different search query'
                }
                if (!results.data.totalItems) next(empty)
                else {
                    let { items } = results.data
                    let responses = []
                    for (let i = 0; i < 10; i++) {
                        const element = items[i];
                        let object = {
                            title: element.title,
                            url: element.url.slice(0, -5)
                        }
                        responses.push(object)                    }
                                      
                    res.status(200).json({ results: responses });
                }                
            })
            .catch(err => next(err))
    }
}

module.exports = OldController