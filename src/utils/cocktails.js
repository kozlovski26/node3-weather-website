const request = require('postman-request')



    const cocktail = (cocktailName) => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita'
        request({url,json:true}, (error, {body}) => {
            if(error){
            callback('unable to connect to weather service!', undefined)    
            }else if(body.error){
            callback('unable to find location!', undefined)
            }else{
                const currently = body
                // const daily = currently
                callback(undefined , currently)
         }
        })
        
        }
        






        module.exports = cocktail

    // module.exports = cocktail