const axios = require('axios');
const cheerio = require('react-native-cheerio');

const comuLink = 'http://ce.muhendislik.comu.edu.tr';
const webAddres = comuLink + '/arsiv/duyurular?p=';

export async function pageLinks(page = 1) {
  // module.exports = async function (page = 1) {
  const degerler = [];

  await axios
    .get(webAddres + page)
    .then((res) => {
      var $ = cheerio.load(res.data, {
        normalizeWhitespace: true,
        xmlMode: true,
      });
      const toplamSayi = $('tbody').children().length;

      for (let i = 1; i <= toplamSayi; i++) {
        degerler[i - 1] = {
          link:
            comuLink +
            $(
              '.table > tbody:nth-child(2) > tr:nth-child(' +
                i +
                ') > td:nth-child(2) > a:nth-child(1)',
            ).attr('href'),
          mesaj: $(
            '.table > tbody:nth-child(2) > tr:nth-child(' +
              i +
              ') > td:nth-child(2) > a:nth-child(1)',
          ).text(),
          yayinTarihi: $(
            '.table > tbody:nth-child(2) > tr:nth-child(' +
              i +
              ') > td:nth-child(3)',
          ).text(),
          sonYayinTarihi: $(
            '.table > tbody:nth-child(2) > tr:nth-child(' +
              i +
              ') > td:nth-child(4)',
          ).text(),
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return degerler;
}

// module.exports = { pageLinks };

// const sonuc = getPageLinks();
// sonuc.then((s) => console.log(s));
// console.log(sonuc.complete);
