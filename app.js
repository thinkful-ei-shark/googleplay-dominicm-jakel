const express = require('express');
const morgan = require('morgan');
const app = express();

const appData = require('./playstore')

app.use(morgan('dev'));



app.get('/app', (req,res)=>{
    const {search} = req.query;
    let data = [...appData]
    
    if(search && search !== "rating" && search !== "app"){
        return res.status(400).json({message:'must be "rating" or "App"'})
    }
        if(search){
            if(Rating )
         data.sort((current,next)=>{
                if(current.Rating < next.Rating) return -1
               if(next.Rating > current.Rating) return 1
               return 0
           })
     }
    res.json(data)
})



app.listen(8080, ()=> {console.log('server on 8080')})


