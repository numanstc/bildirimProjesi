import {
  selectPageLinksPromise,
  selectPageLinkWithSiraPromise,
} from '../sqlite/select';
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
// sayfayı getir
// sırasını kontrol et
// yeni syfanın sırasını bulacak
// eksik olanları ekleyecek
export function eskiDataKaydet(page) {
  return new Promise((resolve, reject) => {
    return duyuruKontrol()
      .then((uzunluk) => (uzunluk.p - page) * 15 + uzunluk.lenght) //verilerin toplam uzunluğu
      .then((sira) => {
        // dbde varmı diye kontrol et

        async function eklenmisPageLinkler() {
          let eklenmisler = [];

          for (let i = sira; i > sira - 15; i--) {
            const gelenDeger = await selectPageLinkWithSiraPromise(i);
            if (gelenDeger !== undefined) {
              // console.log('İf içinde');
              // console.log('gelendeger.mesaj: ' + gelenDeger.mesaj);

              eklenmisler.push(page);
              // verileri kontrol etme yeri
              // for (let property in gelenDeger) {
              //   console.log(property + '=' + gelenDeger[property]);
              // }
            }
          }
          return eklenmisler;
        }

        return eklenmisPageLinkler().then((list) => {
          console.log('Eklenmis Liste genişliği: ' + list.length);
          if (list.length === 15) {
            resolve(true);
            return {devam: false, sira, list};
          }
          return {devam: true, sira, list: []};
        });
      })
      .then(({devam, sira, list}) => {
        // listedeki jsonlara sira parametresini ekle
        if (devam)
          return pageLinks(page).then((data) => {
            let duyuruSira = sira;
            const hazirlanmisList = [];
            data.forEach((page) => {
              hazirlanmisList.push({
                ...page,
                sira: duyuruSira,
              });
              duyuruSira--;
            });
            // liste kontrol
            // hazirlanmisList.forEach((count) => {
            //   for (let property in count) {
            //     console.log(property + '=' + count[property]);
            //   }
            // });
            return {devam, list: hazirlanmisList};
          });
        return {devam, list};
      })
      .then(({devam, list}) => {
        // değerleri gir
        if (devam) insertPageLinks(list);
        // burada liste elemanları çekilebiliğ eski liste elemanları anında silinebilir
        resolve(true);
      });
  });
  // return new Promise((resolve, reject) => {
  //   return duyuruKontrol()
  //     .then((uzunluk) => (uzunluk.p - page) * 15 + uzunluk.lenght) //verilerin toplam uzunluğu
  //     .then((sira) => {
  //       // listedeki jsonlara sira parametresini ekle
  //       return pageLinks(page).then((data) => {
  //         let duyuruSira = sira;
  //         const hazirlanmisList = [];
  //         data.forEach((page) => {
  //           hazirlanmisList.push({
  //             ...page,
  //             sira: duyuruSira,
  //           });
  //           duyuruSira--;
  //         });
  //         // liste kontrol
  //         // hazirlanmisList.forEach((count) => {
  //         //   for (let property in count) {
  //         //     console.log(property + '=' + count[property]);
  //         //   }
  //         // });
  //         return hazirlanmisList;
  //       });
  //     })
  //     .then((list) => {
  //       // girilmemiş değerleri ayır

  //       async function eklenecekPageLinkler() {
  //         let eklenecekler = [];

  //         for (const page of list) {
  //           const gelenDeger = await selectPageLinkWithSiraPromise(page.sira);

  //           // console.log('Gelen Deger: ' + gelenDeger);

  //           if (gelenDeger === undefined) {
  //             console.log('İf içinde');
  //             eklenecekler.push(page);
  //             for (let property in page) {
  //               console.log(property + '=' + page[property]);
  //             }
  //           }
  //           // selectPageLinkWithSiraPromise(page.sira).then((gelenDeger) => {
  //           // });
  //         }

  //         // console.log('Eklenecekler Lenght: ' + eklenecekler.length);
  //         // eklenecekler.forEach((count) => {
  //         //   for (let property in count) {
  //         //     console.log(property + '=' + count[property]);
  //         //   }
  //         // });
  //         return eklenecekler;
  //       }

  //       return eklenecekPageLinkler().then((list) => {
  //         console.log('Eklenenecek Liste genişliği: ' + list.length);
  //         return list;
  //       });
  //     })
  //     .then((insertList) => {
  //       // değerleri gir
  //       if (insertList.length !== 0) return insertPageLinks(insertList);
  //       resolve(true);
  //     });
  // });
}
