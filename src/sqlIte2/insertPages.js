import QueryProvider from './queryProvider';
const service = new QueryProvider();
service.init();

export async function insertPages(pages) {
  service.insert('pageLink', {
    sira: 1,
    mesaj: 'Deneme mesajı',
    link: 'deneme link',
    yayinTarihi: 'yayin tarihi',
    sonYayinTarihi: 'sonYayinTarihi',
  });
}
