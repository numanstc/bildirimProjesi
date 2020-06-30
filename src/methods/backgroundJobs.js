import BackgroundJob from 'react-native-background-job';
import {AppRegistry} from 'react-native';
import notification from './notification';

import {selectPageLinksPromise} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';

const jobKey = 'BildirimKontrol';
BackgroundJob.register({
  jobKey: jobKey,
  job: () => {
    bildirimGoster();
    console.log(`Background Job çalıştı!. Key = ${jobKey}`);
  },
});

function getFark() {
  return selectPageLinksPromise(1).then((pageLinks) => {
    return duyuruKontrol().then((uzunluk) => {
      let fark = (uzunluk.p - 1) * 15 + uzunluk.lenght;

      if (pageLinks.length > 0) {
        fark -= pageLinks[0].sira;
      }

      return fark;
    });
  });
}

function bildirimGoster() {
  getFark().then((fark) => {
    console.log('Fark: ' + fark);

    // buradaki -1 deneme olarak bildirim göstermis için
    if (fark > 0) {
      const title = 'Bildirim Sistemi';
      const message = `${fark} adet okunmamış bildirim var`;
      notification(title, message);
    }
  });
}

export default function backgroundJobs() {
  BackgroundJob.schedule({
    jobKey: jobKey,
    period: 3600000,
  });

  // BackgroundJob.cancel({jobKey: jobKey});
  // BackgroundJob.cancelAll();
}
AppRegistry.registerComponent('backgroundJobs', () => backgroundJobs);
