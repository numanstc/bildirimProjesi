import {useState, useEffect} from 'react';

import {selectPageLinks} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

function useDuyuruKontrol() {
  const [kontrolEt, setKontrolEt] = useState(null);
  const [pageLink, setPageLink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uzunluk, setUzunluk] = useState({
    p: 1,
    lenght: 1,
  });
  const getdata = async () => {
    const tut = await duyuruKontrol();
    setUzunluk({
      p: tut.p,
      lenght: tut.lenght,
    });
    setLoading(false);
  };
  useEffect(() => {
    getdata();
    setPageLink(selectPageLinks(1));
  }, []);

  useEffect(() => {
    if (!loading) {
      if ((uzunluk.p - 1) * 15 + uzunluk.lenght === pageLink[0].sira) {
        setKontrolEt(false);
      } else {
        setKontrolEt(true);
      }
      console.log(
        'Uzunluk.p: ' + uzunluk.p + ' Uzunluk.lenght: ' + uzunluk.lenght,
      );

      console.log('sonLink: ' + pageLink[0].sira);
    }
  }, [loading]);
  return [kontrolEt, loading];
}

export default useDuyuruKontrol;
