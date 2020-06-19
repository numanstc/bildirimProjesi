import QueryProvider from './queryProvider';

const service = new QueryProvider();
service.init();

export function createTables() {
  service.createTable('pageLink', [
    {
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT',
    },
    {
      name: 'sira',
      dataType: 'integer',
    },
    {
      name: 'mesaj',
      dataType: 'Text',
    },
    {
      name: 'link',
      dataType: 'Text',
    },
    {
      name: 'yayinTarihi',
      dataType: 'Text',
    },
    {
      name: 'sonYayinTarihi',
      dataType: 'Text',
    },
  ]);

  service.createTable('page', [
    {
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT',
    },
    {
      name: 'mesaj',
      dataType: 'Text',
    },
    {
      name: 'pageLinkId',
      dataType: 'integer',
    },
  ]);

  service.createTable('image', [
    {
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT',
    },
    {
      name: 'alt',
      dataType: 'Text',
    },
    {
      name: 'height',
      dataType: 'integer',
    },
    {
      name: 'width',
      dataType: 'integer',
    },
    {
      name: 'src',
      dataType: 'Text',
    },
    {
      name: 'pageId',
      dataType: 'integer',
    },
  ]);

  service.createTable('link', [
    {
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT',
    },
    {
      name: 'name',
      dataType: 'Text',
    },
    {
      name: 'link',
      dataType: 'Text',
    },
    {
      name: 'pageId',
      dataType: 'integer',
    },
  ]);

  service.createTable('ek', [
    {
      name: 'id',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT',
    },
    {
      name: 'name',
      dataType: 'Text',
    },
    {
      name: 'link',
      dataType: 'Text',
    },
    {
      name: 'pageId',
      dataType: 'integer',
    },
  ]);

  service.insert('pageLink', {
    sira: 1,
    mesaj: 'Deneme mesajı',
    link: 'deneme link',
    yayinTarihi: 'yayin tarihi',
    sonYayinTarihi: 'sonYayinTarihi',
  });
}
