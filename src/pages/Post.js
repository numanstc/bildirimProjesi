import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import {selectPagePromise, selectPage} from '../sqlite/select';
import {getPageWithSubContents} from '../methods/veriCek';
import {FlatList} from 'react-native-gesture-handler';
import LisItem from '../components/LisItem';

// veridini db olup olmadığını sorulayıp
// b) db de değilse db ye ekle
// a) db de ise çek ve göster
function Post({route}) {
  const [postData, setPostData] = useState({});
  const [load, setLoad] = useState(false);
  const [listItems, setListItems] = useState();
  const data = route.params.data;
  // console.log(data.link);

  // Post verilerisini DB den çek postData ya ata
  function loadPost() {
    getPageWithSubContents(data).then((page) => {
      setPostData(page);
      setLoad(true);
      for (let property in page) {
        console.log(property + '=' + page[property]);
      }
      page.ul.forEach((element) => {
        for (let property in element) {
          console.log(property + '=' + element[property]);
        }
      });
    });
  }

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    if (load) {
      const li = postData.ul.map((item) => {
        return (
          <Text key={item.rowid} style={styles.postTitle}>
            {item.mesaj}
          </Text>
        );
      });
      setListItems(li);
    }
  }, [load]);

  return (
    <View style={styles.container}>
      <Header title={data.mesaj} />
      <View style={styles.company}>
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}>{postData.mesaj}</Text>
          {/* <Text style={styles.postTitle}>{postData.mesaj}</Text> */}
        </View>
      </View>

      {postData.ul && (
        <View style={styles.company}>
          <View style={styles.companyDetails}>
            {listItems}
            {/* <FlatList
              data={postData.ul}
              renderItem={({item}) => (
              )}
              keyExtractor={(item) => item.rowid.toString()}
            /> */}
          </View>
        </View>
      )}

      {/* <Content
          style={{width: '100%', marginVertical: 25}}
          content={data.description}
        /> */}
      <View style={styles.card}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Icon name="calendar" color="#26ae61" size={18} />
            <Text style={styles.itemHeaderText}>Son Güncelleme:</Text>
          </View>
          <Text style={styles.itemContent}>
            {
              // timeSince(data.updated_at)
            }
            Time since
          </Text>
        </View>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Icon name="user" color="#26ae61" size={18} />
            <Text style={styles.itemHeaderText}>Pozisyon:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemContent}>
              {/* {data.position} */}
              pozisyon 2
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Icon name="map-pin" color="#26ae61" size={18} />
            <Text style={styles.itemHeaderText}>Lokasyon:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemContent}>
              {/* {data.location}  */}
              yer
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Icon name="bookmark" color="#26ae61" size={18} />
            <Text style={styles.itemHeaderText}>Etiketler:</Text>
          </View>
          {/* <View style={{flex: 1}}>
              {data.tags.length ? (
                <Tags
                  tags={data.tags}
                  slug={data.slug}
                  style={styles.tags}
                  tagStyle={styles.tag}
                  tagTextStyle={styles.tagText}
                />
              ) : null}
            </View> */}
        </View>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Icon name="share-2" color="#26ae61" size={18} />
            <Text style={styles.itemHeaderText}>Bağlantılar:</Text>
          </View>
          <View style={{flex: 1}}>
            {/* <SocialButtons
                web={data.company.www}
                twitter={data.company.twitter}
                linkedin={data.company.linkedin}
              /> */}
          </View>
        </View>
      </View>
      {/* <Apply
          email={data.apply_email}
          url={data.apply_url}
          position={data.position}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  company: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 48,
    height: 48,
    backgroundColor: '#f9f9f9',
    borderRadius: 24,
  },
  companyDetails: {
    marginLeft: 20,
    flex: 1,
  },
  companyName: {
    color: '#333',
    fontSize: 17,
    marginBottom: 4,
  },
  postTitle: {
    color: '#555',
    fontSize: 14,
  },
  card: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  itemHeaderText: {
    color: '#1d9b54',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  itemContent: {
    color: '#333',
    fontSize: 14,
  },
  tags: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: -10,
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 13,
  },
});

export default Post;
