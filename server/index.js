require('dotenv').config();
const express = require('express');
const {SERVER_PORT} = process.env;
const axios = require('axios')
const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

const app = express();

app.use(express.json());

app.post('/api/ecb/forex/stats', async(req, res) => {
    const {base_currency, base_amount, target_currency} = req.body;

    let currencyInfo = await axios.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", function(res) {
        let data = '';

        res.on('data', async function(stream) {
            data += stream;
        });
        res.on('end', async function(){
            parser.parseString(data, async function(error, result) {
                if(error === null) {
                    result['gesmes:Envelope'].Cube[0].Cube.forEach(element => {
                            // console.log("at",element.Cube); 
                            return element.Cube;  
                        });;
                }
                else {
                    console.log(error);
                }
            });
        });
    });
    console.log(currencyInfo.data);
})

const port = SERVER_PORT;
app.listen(port, () => console.log(`Port running on port ${port}`));