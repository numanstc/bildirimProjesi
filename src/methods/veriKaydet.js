import {selectPageLinksPromise} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';
import {pageLinks} from '../webScraping/pageLinks';
import {insertPageLinks} from '../sqlite/insert';

export function guncelKaydet() {
  return new Promise((resolve, reject) => {
    function getFark() {
      return selectPageLinksPromise(1).then((pageLinks) => {
        return duyuruKontrol().then((uzunluk) => {
          let fark = (uzunluk.p - 1) * 15 + uzunluk.lenght;
          let toplamDuyuru = (uzunluk.p - 1) * 15 + uzunluk.lenght;

          if (pageLinks.length > 0) {
            fark -= pageLinks[0].sira;
          }

          return {fark, toplamDuyuru};
        });
      });
    }

    function getData(fark, toplamDuyuru) {
      return pageLinks().then((data) => {
        let insertList = [];

        let listSize = 0;
        if (data.length > fark) {
          listSize = fark;
        } else {
          listSize = data.length;
        }

        for (let i = 0; i < listSize; i++) {
          insertList.push({
            ...data[i],
            sira: toplamDuyuru - i,
          });
        }
        console.log('Eksik Duyuru Farkı:' + fark);
        console.log('Toplam Duyuru:' + toplamDuyuru);
        return insertList;
      });
    }

    getFark()
      .then(({fark, toplamDuyuru}) => {
        if (fark === 0) {
          resolve(true);
          return [];
        } else {
          return getData(fark, toplamDuyuru);
        }
      })
      .then((insertList) => {
        if (insertList.length !== 0) return insertPageLinks(insertList);
      })
      .then(() => {
        resolve(true);
      });
  });
}
