const axios  = require('axios');
const request = require("request");
const authSync = require("../middleware/authSync");
const cheerio = require("cheerio");

const router = require("express").Router();

router.post('/tracking-website',authSync,async (req,res) =>{
    try {
        const response = res;
        await request(req.body.url, async (error,res,body) =>{
            if(error){
                return response.status(500).send(error);        
            }
            var $ = cheerio.load(body);
            var dataCommit = {
                success : [],
                errors : []
            }
            await $('li').each( async  function(i, element) {
                var name =  $(this).find('h3').text();
                try {
                var data = await axios.post(`http://localhost:7000/api/product-type/create`, {
                        name: name,
                        origin: "sync"
                    },
                    {
                        headers: {
                            username: req.headers['username'],
                            password: req.headers['password']
                        }
                    })  
                } catch (error) {
                    return response.status(500).send(error.message);            
                }
            })
            return response.send(dataCommit);    
        })
        // return res.status(200).send('OK');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;