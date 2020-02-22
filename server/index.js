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
    console.log(base_currency, base_amount, target_currency);

    let currencyInfo = await new Promise((resolve, reject) => {
        https.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", function(res) {
            let data = '';
    
            res.on('data', async function(stream) {
                data += stream;
            });
            return res.on('end', async function(){
                return parser.parseString(data, async function(error, result) {
                    if(error === null) {
                        return result['gesmes:Envelope'].Cube[0].Cube.forEach(element => {
                                resolve(element.Cube);  
                            });;
                    }
                    else {
                        console.log(error);
                    }
                });
            });
        });
    }) 
    currencyInfo.push({ ATTR: { currency: 'EUR', rate: '1' } })
    console.log("answer", currencyInfo);

    currencyConverter = async (base_currency, base_amount, target_currency) => {
        console.log("answer-2", currencyInfo)
        console.log("base", base_currency)
        
        let baseRate = await currencyInfo.find(element => {
            if(element.ATTR.currency === base_currency){
                return element
            }
        })
        baseRate = baseRate.ATTR.rate;
        console.log("baseRate", baseRate)

        let targetBaseRate = await currencyInfo.find(element => {
            if(element.ATTR.currency === target_currency){
                return element
            }
        })
        targetBaseRate = targetBaseRate.ATTR.rate;
        console.log("targetBaseRate", targetBaseRate)

        targetAmount = async (targetBaseRate, baseRate, base_amount) => {
            let target_amount = (targetBaseRate/baseRate) * base_amount;

            return target_amount;
        }

        let target_amount = await targetAmount(targetBaseRate, baseRate, base_amount);
        console.log(target_amount)
    }
    
    currencyConverter(base_currency, base_amount, target_currency);
})

const port = SERVER_PORT;
app.listen(port, () => console.log(`Port running on port ${port}`));