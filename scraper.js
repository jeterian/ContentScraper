// Problem: Need a content scraper that takes information from
// http://shirts4mike.com and puts the information in a CSV File

'use strict';

// initial variables for fs, 3d party npm packages
const fs = require('fs');
const scraper = require('x-ray'); // content scraper
const writeCSV = require('json2csv'); // parses json to csv
const url = 'http://shirts4mike.com/shirts.php';
const folder = './data';

// 1. Program scraper to check for folder named 'Data'

  // If 'Data' doesn't exist, create it

  // Else, do nothing

// 2. Use npm package that scrapes content from a site

// 3. Use npm package that creates CSV file

// 4. use http://shirts4mike.com/shirts.php as single entry point and
//    scrape infor for eight t-shirts

//5. Retrieve price, title, url and image url from product page and save as CSV

  // CSV named for date

  // Column headings in the following order: title, price, imageurl, url, time

  // Saved in 'Data' folder

// 6. If program is run twice, it should overwrite "Data"

// 7. If http://shirts4mike.com is down, give error message

  // EC: Log to a file named scraper-error.log that appends to bottom wih timestamp

// 8. Include package.json with dependencies and npm install should install dependencies

  // EC: edit package.json file so it runs when npm start is run
