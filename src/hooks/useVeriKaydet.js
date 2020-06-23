import {useState, useEffect} from 'react';
import {insertPageLinks} from '../sqlite/insert';
import {pageLinks} from '../webScraping/pageLinks';

import {selectPageLinksPromise} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

// const veri = {};
// veri = {
//   page: 1,
//   bit: 7,
//   bas: 0,
//   sira: 0,
// }

function useVeriKaydet() {
  const [loading, setLoading] = useState(true);

  const getFark = async () => {
    return selectPageLinksPromise(1).then((pageLinks) => {
      return duyuruKontrol().then((uzunluk) => {
        let fark = (uzunluk.p - 1) * 15 + uzunluk.lenght;

        if (pageLinks.length > 0) {
          fark -= pageLinks[0].sira;
        }
        return fark;
      });
    });
  };

  async function getData(veri) {
    if (veri.sira === 0) {
      return;
    }

    const data = await pageLinks(veri.page);
    const sira = veri.sira;

    // console.log('veriler: ' + data);
    if (data.length > 0) {
      if (data.length < veri.bit) {
        veri.bit = data.length;
      }

      let list = [];

      for (let i = veri.bas; i < veri.bit; i++) {
        list.push(data[i]);
      }

      // return list;
      return {
        list,
        sira,
      };
      // await insertPageLinks(list, veri.sira);
      // console.log('Veriler dbye yüklendi');
    }
  }

  useEffect(() => {
    getFark()
      .then((fark) => {
        return getData({
          page: 1,
          bit: 7,
          bas: 0,
          sira: fark,
        });
      })
      .then(({list, sira}) => {
        return insertPageLinks(list, sira);
      })
      .then(() => {
        setLoading(false);
        console.log('Veri kontrol ve ekleme bitti: ' + loading);
      });
  }, []);

  return loading;
}

export default useVeriKaydet;
