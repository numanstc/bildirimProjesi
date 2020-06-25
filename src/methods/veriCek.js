import {
  selectPagePromise,
  selectImagesPromise,
  selectLinksPromise,
  selectExtrasPromise,
  selectUlPromise,
} from '../sqlite/select';
import {pageKaydet} from './veriKaydet';

export function getPageWithSubContents(pageLink) {
  return new Promise((resolve, reject) => {
    let page1 = {
      mesaj: '',
      image: [],
      link: [],
      extra: [],
      ul: [],
    };
    return selectPagePromise(pageLink.rowid)
      .then((selectedPage) => {
        if (selectedPage.length === 0) {
          // sayfa kayıtlı değilse sayfayı kayıt et ve bu fonksiyonu çağır
          return pageKaydet(pageLink).then(() =>
            getPageWithSubContents(pageLink),
          );
        }
        page1 = {...page1, mesaj: selectedPage[0].mesaj};
        return selectImagesPromise(selectedPage[0].rowid)
          .then((selectedImages) => {
            return {...page1, image: selectedImages};
          })
          .then((page) =>
            selectLinksPromise(selectedPage[0].rowid).then((selectedLinks) => {
              return {
                ...page,
                link: selectedLinks,
              };
            }),
          )
          .then((page) =>
            selectLinksPromise(selectedPage[0].rowid).then((selectedLinks) => {
              return {...page, link: selectedLinks};
            }),
          )
          .then((page) =>
            selectExtrasPromise(selectedPage[0].rowid).then(
              (selectedExtras) => {
                return {...page, extra: selectedExtras};
              },
            ),
          )
          .then((page) =>
            selectUlPromise(selectedPage[0].rowid).then((selectedUl) => {
              return {...page, ul: selectedUl};
            }),
          );
      })
      .then((page) => {
        resolve(page);
        return page;
      });
  });
}
