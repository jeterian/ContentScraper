// Problem: Need a content scraper that takes information from
// http://shirts4mike.com and puts the information in a CSV File

'use strict';

// initial variables for fs, 3d party npm packages
const fs = require('fs');
const scraper = require('x-ray'); // content scraper
const xray = scraper();
const writeCSV = require('csv-write-stream'); // parses json to csv
const parse = writeCSV();
 // for handling the date
var moment = require('moment');
moment().format();
const url = 'http://shirts4mike.com/shirts.php';
const folder = './data';
const date = moment().format("YYYY-MM-DD");

// 1. Program scraper to check for folder named 'Data'
var dataFolder = new Promise(function(resolve, reject) {

  // If 'Data' doesn't exist, create it
  if (!fs.existsSync(folder)) {
    console.log("Creating Data folder...");
    fs.mkdirSync(folder);
    writer.pipe(fs.createWriteStream(folder + date + '.csv'));
  }
});

// 2. Use npm package that scrapes content from a site.  Retrieve price, title,
//    url and image url from product page and save as CSV

  // CSV named for date

  // Column headings in the following order: title, price, imageurl, url, time

  // Saved in 'Data' folder

// 6. If program is run twice, it should overwrite "Data"

// 7. If http://shirts4mike.com is down, give error message

  // EC: Log to a file named scraper-error.log that appends to bottom wih timestamp

// 8. Include package.json with dependencies and npm install should install dependencies

  // EC: edit package.json file so it runs when npm start is run
