const axios = require('axios');
const cheerio = require('react-native-cheerio');
// const pageLinks = require('./pageLinks');
import {pageLinks} from './pageLinks';

const comuLink = 'http://ce.muhendislik.comu.edu.tr';
const webAddres = comuLink + '/arsiv/duyurular?p=';

export default async function getLastPage(page = 1) {
  let sonSayfa = {
    p: '',
    lenght: '',
  };
  await axios
    .get(webAddres + page)
    .then((res) => {
      var $ = cheerio.load(res.data, {
        normalizeWhitespace: true,
        xmlMode: true,
      });
      const sonSayfaLink = $('.pagination')[0].lastChild.prev.childNodes[1]
        .attribs.href;

      sonSayfa.p = parseInt(sonSayfaLink.split('=')[1]);
    })
    .catch((err) => {
      console.log(err);
    });

  await pageLinks(sonSayfa.p).then(
    (veriList) => (sonSayfa.lenght = parseInt(veriList.length)),
  );
  return sonSayfa;
}

// getLastPage().then((page) => console.log(page));
