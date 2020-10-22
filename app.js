const express = require('express');
const morgan = require('morgan');
const app = express();

const appData = require('./playstore')

app.use(morgan('dev'));



app.get('/app', (req,res)=>{
    const {sort = '', genres = ''} = req.query;
    const availGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    let data = [...appData]
    
     if(sort && sort !== "rating" && sort !== "app"){
         return res.status(400).json({message:'must be "rating" or "App"'})
     }
        if(sort){
            if(sort === "rating"){
                 data.sort((a,b)=>{
                    return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0
                 })
            }
        }
            if(sort){
                if(sort === "app"){
                    data.sort((a,b)=>{
                        return a.App > b.App ? 1: a.App < b.App ? -1 : 0
                })
            }
        }

     let match = false;
     let result = '';
    
    for(let i = 0;i<availGenres.length;i++){
        if(genres.toLowerCase() === availGenres[i].toLowerCase()){
            match = true;
            result = availGenres[i];
        }
    }
        if(genres && !match){
            return res.status(400).json({message:'must be of available genre type [Action, Puzzle, Strategy, Casual, Arcade, Card]'})
        }
        if(genres){
             data = data.filter(item => item.Genres === result);
        }
    res.json(data)
})

app.listen(8080, ()=> {console.log('server on 8080')})


