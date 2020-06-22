import {useEffect, useState} from 'react';
import {insertPageLinks} from '../sqlite/insert';
import {pageLinks} from '../webScraping/pageLinks';

function useInsertPageLink(veri = {}) {
  // veri = {
  //   page: 1,
  //   bit: 7,
  //   bas: 0,
  //   sira: 0,
  // }
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const data = await pageLinks(veri.page);
    console.log('veriler: ' + data);
    if (data.length > 0) {
      if (data.length < veri.bit) {
        veri.bit = data.length;
      }

      let list = [];

      for (let i = veri.bas; i < veri.bit; i++) {
        list.push(data[i]);
      }

      await insertPageLinks(list, veri.sira);
      console.log('Veriler dbye yüklendi');

      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return loading;
}

export default useInsertPageLink;
