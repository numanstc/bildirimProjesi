import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function PostPreviewSkeleton() {
  return (
    <View style={styles.post} activeOpacity={0.75}>
      <View style={styles.top}>
        <View style={styles.flexStyle}>
          <ShimmerPlaceHolder
            colorShimmer={['#ebebeb', '#ddd', '#ebebeb']}
            autoRun={true}
            style={styles.title}
          />
        </View>
      </View>
      <View style={styles.info}>
        {[1, 2].map((key) => (
          <View style={styles.infoItem} key={'item-skeleton-' + key}>
            <ShimmerPlaceHolder
              colorShimmer={['#ebebeb', '#ddd', '#ebebeb']}
              autoRun={true}
              style={styles.icon}
            />
            <ShimmerPlaceHolder
              colorShimmer={['#ebebeb', '#ddd', '#ebebeb']}
              autoRun={true}
              style={styles.infoText}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: '#FFF',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  top: {
    flexDirection: 'row',
  },
  title: {
    height: 20,
    borderRadius: 3,
    marginBottom: 5,
  },
  info: {
    flexDirection: 'row',
    marginTop: 14,
    flexWrap: 'wrap',
  },
  infoItem: {
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 3,
    width: 60,
    borderRadius: 3,
  },
  icon: {
    width: 14,
    marginRight: 2,
    borderRadius: 8,
  },
  flexStyle: {
    flex: 1,
  },
});
