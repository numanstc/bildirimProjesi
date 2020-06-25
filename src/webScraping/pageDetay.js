const axios = require('axios');
const cheerio = require('react-native-cheerio');

export async function pageDetay(siteAddress) {
  const sonuc = {
    text: '',
    link: [],
    image: [],
    ul: [],
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
        // sonuc.text += `<a href='${}'`

        let name = '';
        let link = parent.attribs.href;

        if (parent.childNodes.length > 0) {
          name = parent.childNodes[0].data;
          // sonuc.text += ' <a href=' + link + '>' + name + '</a>';
        } else {
          name = parent.attribs.title;
        }
        sonuc.link.push({name, link});
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

  function listeYaz(parent) {
    const tagName = parent.tagName;
    const type = parent.type;
    console.log('Tagname: ' + tagName);

    parent.childNodes.forEach((element) => {
      if (element.type === 'tag' && element.name === 'li') {
        let li = '';
        function getLiText(parent) {
          const tagName = parent.tagName;
          const type = parent.type;

          if (type === 'text') {
            li += ' ' + parent.data;
          } else if (type === 'tag') {
            if (tagName === 'a') {
              let name = '';
              let link = parent.attribs.href;
              if (parent.childNodes.length > 0) {
                name = parent.childNodes[0].data;
              } else {
                name = parent.attribs.title;
              }
              li += ' <a href=' + link + '>' + name + '</a>';

              return;
            }
          }
          if (parent.childNodes === null) return;
          if (parent.childNodes.length > 0)
            parent.childNodes.map((node) => {
              getLiText(node);
            });
        }
        getLiText(element);
        sonuc.ul.push(li);
      }
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
      } else if (node.tagName === 'ul') {
        listeYaz(node);
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
