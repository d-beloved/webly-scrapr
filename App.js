const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

const cnn = 'https://lite.cnn.com/en';
const string= 'Trump';

// fetching the data from the website

function getFromSite(resp) {
  fetch(cnn)
  .then(res=> res.text())
  .then((html) => {
    resp(html);
  })
};

// gathering the needed data from the selected website using cheerio

function getLatestHeadline(data) {
  const $ = cheerio.load(data);
  let Titles = [];
  $('ul').children('li').each(function(i,el){
    Titles.push({title : $(el).text() ,link : $(el).children('a').attr('href') })
  })

  return Titles[0];
}

setInterval(() => {
  getFromSite((data) => {
    const latestHeadline = getLatestHeadline(data);
    if(latestHeadline.title.includes(string)) console.log('Article on Trump released', latestHeadline);
  })
}, 5 * 1000);
