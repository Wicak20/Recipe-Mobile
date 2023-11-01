/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MainStyle} from '../../AppStyles';
import Icon from 'react-native-vector-icons/Feather';
export default function PopularView({navigation}) {
  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <View style={styles.tab}>
          <Icon
            name="chevron-left"
            size={30}
            color="#808080"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Popular Recipes</Text>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://res.cloudinary.com/dedas1ohg/image/upload/v1680575811/recipes_images/96bbf7e44d119d80a61c4894c5c96c74_ibqm5a.jpg',
            }}
          />
          <View>
            <Text style={styles.title}>Recipe Title</Text>
            <Text style={styles.title}>Category</Text>
            <Text style={styles.title}>Author</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btn}>
              <Icon name="bookmark" size={23} color="#E9E9E8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Icon name="thumbs-up" size={23} color="#E9E9E8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 23,
    width: 343,
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  title: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  tab: {
    width: 367,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#EFC81A',
    alignSelf: 'center',
    fontWeight: '600',
    marginHorizontal: 50,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#EFC81A',
    height: 36,
    width: 36,
    borderRadius: 16,
  },
});
