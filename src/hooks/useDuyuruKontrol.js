import {useState, useEffect} from 'react';

import {selectPageLinks} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

function useDuyuruKontrol() {
  const [bolumFark, setBolumFark] = useState(0);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    const pageLinks = selectPageLinks(1);
    duyuruKontrol().then((uzunluk) => {
      let fark = (fark = (uzunluk.p - 1) * 15 + uzunluk.lenght);

      if (pageLinks.length > 0) fark -= pageLinks[0].sira;

      setBolumFark(fark);
      setLoading(false);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  return [bolumFark, loading];
}

export default useDuyuruKontrol;
