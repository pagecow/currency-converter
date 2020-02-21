require('dotenv').config();
const express = require('express');
const {SERVER_PORT} = process.env;
const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

const app = express();

app.use(express.json());

app.post('/api/ecb/forex/stats', async(req, res) => {
    const {base_currency, base_amount, target_currency} = req.body;

    let conversionRates = await https.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", function(res) {
        let data = '';
        res.on('data', async function(stream) {
            data += stream;
        });
        res.on('end', async function(){
            parser.parseString(data, async function(error, result) {
                if(error === null) {
                    let res = await result;
                    console.log(res);
                    let envelope = await res['gesmes:Envelope']
                    console.log(envelope)
                    let cube = await envelope.Cube
                    console.log(cube)
                    let myCube = await cube.forEach(element => {
                        let rate = element.rate
                        // document.querySelector('rate');
                        let currency = element.currency
                        // document.querySelector('currency');
                        return '1$euro;='+ rate + currency;
                    });
                    console.log(myCube)
                }
                else {
                    console.log(error);
                    // let cube = await res.Cube
                    // console.log(cube)
                }
            });
        });
    });



    // console.log(conversionRates)

})

const port = SERVER_PORT;
app.listen(port, () => console.log(`Port running on port ${port}`));