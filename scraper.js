// Treehouse Project 6 - Content scraper

// variables for npm modules and other essentials
const fs = require('fs');
const xray = require('x-ray');
const json2csv = require('json2csv');
const moment = require('moment');
var x = new xray();
const url = 'http://shirts4mike.com/shirts.php';
const products = '.products li';

// 1. Test to see if Data folder exists, if not, create one.
if (!fs.existsSync('./data/')){
    console.log('Creating folder...')
    fs.mkdir('.//data', function (error) {
      // if something goes wrong, error logged to log file
        if (error) {
            const logErrs = moment().format + ' - ' + error;
            console.log(logErrs);
            fs.appendFileSync('scraper-error.log', logErrs + '\n');
        };
    })
}

// 2. Scrape the site to retrieve the information requested.

x(url, products,  [{
    title : x('a@href', 'title'),
    price : x('a@href', '.price'),
    imgUrl : 'img@src',
    url : 'a@href'
}])
    ((error, object) => {
        if(error) {
              // EC: Log to a file named scraper-error.log that appends to bottom wih timestamp
            const logErrs = moment().format() + ' - ' + error;
            console.log(logErrs);
            fs.appendFileSync('scraper-error.log', logErrs + '\n');
            if (error.errno === 'ENOTFOUND') {
                console.log(`A 404 error has occured.`);
            } else if (error.errno === 'ETIMEDOUT'){
                console.log(`A timeout error has occured.`);
            } else {
                console.log(`A ${error.errno} error has occured.`);
            }
        }
        else {
            // append time
            const now = moment().format('YYYY-MM-DD');
            for (key in object){
                object[key].time = now;
            }

            // 3. parse json and save as csv
            const headings = ['title', 'price', 'imgUrl', 'url', 'time'];
            const csv = json2csv({ data: object, fields: headings});
            console.log(csv);
            fs.writeFileSync(`./data/${now}.csv`, csv);
        }
    });
