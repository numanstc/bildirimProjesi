import {AppRegistry} from 'react-native';
import BackgroundJob from 'react-native-background-job';
import {selectPageLinksPromise} from '../sqlite/select';
import duyuruKontrol from '../webScraping/duyuruKontrol';
import notification from './notification';
import {guncelKaydet} from './veriKaydet';

const jobKey = 'BildirimKontrol';
BackgroundJob.register({
  jobKey: jobKey,
  job: () => {
    bildirimGoster();
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
    if (fark > 0) {
      const title = 'Bildirim Sistemi';
      const message = `${fark} adet okunmamış bildirim var`;
      notification(title, message);
      guncelKaydet();
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
