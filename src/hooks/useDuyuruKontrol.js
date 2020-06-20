import {useState, useEffect} from 'react';

import {selectPageLinks} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

function useDuyuruKontrol() {
  const [kontrolEt, setKontrolEt] = useState(false);
  const [kayitliSonLink, setKayitliSonLink] = useState([{sira: 1}]);
  const [uzunluk, setUzunluk] = useState({
    p: 1,
    lenght: 1,
  });

  useEffect(() => {
    setUzunluk(duyuruKontrol());
    setKayitliSonLink(selectPageLinks());
  }, []);

  useEffect(() => {
    if (kayitliSonLink[0].sira !== (uzunluk.p - 1) * 15 + uzunluk.lenght)
      setKontrolEt(true);
    console.log(
      'Hook Çalıştı Uzunluk: ' + (uzunluk.p - 1) * 15 + uzunluk.lenght,
    );
  }, []);
  return kontrolEt;
}

export default useDuyuruKontrol;
