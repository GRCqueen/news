const axios = require('axios')
function compareBytimestamp(a, b){
    if(a.timestamp > b.timestamp){
        return 1
    }else{
        return -1
    }
}
function compareByTitle(a, b){
    if(a.title > b.title){
        return 1
    }else{
        return -1
    }
}
class RayhanController {
    static getNews(req, res, next){
            const url = `https://dekontaminasi.com/api/id/covid19/news`       
            axios.get(url)
                .then(results => {
                    results.data.forEach(e => {
                        e.timestamp = Date(e.timestamp)
                    });
                    if(req.params.key == 'time'){
                        results.data.sort(compareBytimestamp)
                    }else if(req.params.key == 'title'){
                        results.data.sort(compareByTitle)
                    }
                    res.status(200).json({
                        covid_news: results.data
                    })
                })
                .catch(err => {
                    err.msg = 'Something wrong'
                    next(err)
                })
    }
    static statisticInfo(req, res, next){
        const url = `https://dekontaminasi.com/api/id/covid19/stats`       
            axios.get(url)
                .then(results => {
                    res.status(200).json({
                        contaminated_update: results.data
                    })
                })
                .catch(err => {
                    err.msg = 'Something wrong'
                    next(err)
                })
    }
}
module.exports = RayhanController