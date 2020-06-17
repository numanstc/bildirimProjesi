const axios = require('axios');
const cheerio = require('cheerio');

export async function pageDetay(siteAddress) {
  // module.exports = async function pageDetay(siteAddress) {
  const sonuc = {
    text: '',
    link: [],
    image: [],
    ek: [],
  };
  function dataYaz(parent) {
    const tagName = parent.tagName;
    const type = parent.type;

    if (type === 'text') {
      sonuc.text += ' ' + parent.data;
    } else if (type === 'tag') {
      if (tagName === 'a') {
        // namedeparent.attribs.title View this pdf file linkini
        // diğeri kalan bütün linkleri alıyor
        sonuc.link.push({
          name:
            parent.childNodes.length > 0
              ? parent.childNodes[0].data
              : parent.attribs.title,
          link: parent.attribs.href,
        });
        return;
      } else if (tagName === 'img') {
        sonuc.image.push({
          alt: parent.attribs.alt,
          height: parent.attribs.height,
          width: parent.attribs.width,
          src: parent.attribs.src,
        });
      }
    }
    if (parent.childNodes === null) return;
    if (parent.childNodes.length > 0)
      parent.childNodes.map((node) => {
        dataYaz(node);
      });
  }

  function eklerYaz(parent) {
    sonuc.ek.push({
      name: parent.childNodes[3].childNodes[0].data,
      link: parent.childNodes[5].childNodes[2].attribs.href,
    });
  }
  await axios.get(siteAddress).then((res) => {
    var $ = cheerio.load(res.data, {
      normalizeWhitespace: true,
      xmlMode: true,
    });
    const container = $('.simpleAltsayfa')[0].childNodes[5].childNodes[1];

    const ekContainer = $('.ustAyir')[0];

    container.childNodes.map((node) => {
      if (node.tagName === 'p') {
        dataYaz(node);
      }
    });

    if (ekContainer !== null && typeof ekContainer !== 'undefined')
      ekContainer.childNodes.map((child) => {
        if (child.type === 'tag' && child.childNodes.length === 7) {
          // html tasaarımda ekler bölümünde başlık hariç her ekte 7
          // obje alt childNotes var
          eklerYaz(child);
        }
      });
  });

  return sonuc;
}

// pageDetay(siteAddress[4]).then((sonuc) => console.log(sonuc));
