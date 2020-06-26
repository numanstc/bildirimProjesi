import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import {selectPagePromise, selectPage} from '../sqlite/select';
import {getPageWithSubContents} from '../methods/veriCek';
import {FlatList} from 'react-native-gesture-handler';

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

      {postData.ul && load && (
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
  companyDetails: {
    marginLeft: 20,
    flex: 1,
  },
});

export default Post;
