// Problem: Need a content scraper that takes information from
// http://shirts4mike.com and puts the information in a CSV File

'use strict';

// initial variables for fs, 3d party npm packages
const fs = require('fs');
const scraper = require('x-ray'); // content scraper
const xray = scraper();
const writeCSV = require('csv-write-stream'); // parses json to csv
const parse = writeCSV();
const moment = require('moment'); // for handling the date
const request = require('request');
const url = 'http://shirts4mike.com/shirts.php';
const folder = './data';
const date = moment().format("YYYY-MM-DD");

// 1. Check for folder named 'Data'/ Check and see if URL works
var checkURL = function(resolve, reject) {

  // If 'Data' doesn't exist, create it
  if (!fs.existsSync(folder)) {
    console.log("Creating Data folder...");
    fs.mkdirSync(folder);
    writer.pipe(fs.createWriteStream(folder + date + '.csv'));
  }

  request(url, (error, response, body) =>  {
    if(!error && response.statusCode === 200) {
      resolve(body);
    } else {
      reject(error);
    }
  })
};

// 2. Use npm package that scrapes content from a site.  Retrieve price, title,
//    url and image url from product page and save as CSV
  xray(url, '.products li', [{
    title: xray('a@href', 'title'),
    price: xray('a@href', 'price'),
    title: 'img@src',
    url: 'a@href'
  }])

    // EC: Log to a file named scraper-error.log that appends to bottom wih timestamp
    ((error, object) => {
      if(error) {
        const logErr = date + ': ' + error;
        console.log(logErr);
        fs.appendFileSync('scraper-error.log', logErr + '\n');
        if (error.errno === 'ENOTFOUND') {
          const fourOfour = '404';
          console.log(`404 Error: Cannot connect to ${url}.`);
        } else if (error.errno ==='ETIMEDOUT'){
            console.log(`Timeout Error: Cannot connect to ${url}.`);
        } else {
          console.log(`${error.name} error. Cannot connect to ${url}.`)
        }
      } else {
        for (key in object) {
          object[key].time = date;
        }

// Column headings in the following order: title, price, imageurl, url, time
        const headers = ['title', 'price', 'imgUrl', 'url', 'time'];
        const csv = parse({data: object, fields: headers});
        console.log(csv);

          // CSV named for date
        fs.writeFileSync(folder + date + ".csv", csv);
      }
    });
