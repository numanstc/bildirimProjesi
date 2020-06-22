import {useState, useEffect} from 'react';

import {selectPageLinks} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

function useDuyuruKontrol() {
  const [bolumFark, setBolumFark] = useState(0);
  const [pageLink, setPageLink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uzunluk, setUzunluk] = useState({
    p: 1,
    lenght: 1,
  });
  const getdata = async () => {
    setPageLink(selectPageLinks(1));
    const tut = await duyuruKontrol();
    setUzunluk({
      p: tut.p,
      lenght: tut.lenght,
    });
    setLoading(false);
  };
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (!loading) {
      setBolumFark((uzunluk.p - 1) * 15 + uzunluk.lenght - pageLink[0].sira);
      console.log(
        'site uzunluk: ' + (uzunluk.p - 1) * 15 + parseInt(uzunluk.lenght),
      );

      console.log(
        'Uzunluk.p: ' + uzunluk.p + ' Uzunluk.lenght: ' + uzunluk.lenght,
      );

      console.log('sonLink: ' + pageLink[0].sira);
    }
  }, [loading]);
  return [bolumFark, loading];
}

export default useDuyuruKontrol;
