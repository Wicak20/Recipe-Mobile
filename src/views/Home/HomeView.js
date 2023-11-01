/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { MainStyle } from '../../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipe, getCategories } from '../../storages/actions/recipeAction';
export default function HomeView({ navigation }) {
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.all);
  const categories = useSelector(state => state.categories);

  const token = useSelector(state => state.auth.data.data.accessToken);
  useEffect(() => {
    dispatch(getAllRecipe(token, search));
    dispatch(getCategories());
  }, [dispatch, token, search]);
  const refreshHandler = () => {
    setRefresh(true);
    setTimeout(() => {
      dispatch(getAllRecipe(token, search)).then(() => {
        setRefresh(false);
      });
    }, 1000);
  };
  const w = width * 0.8;
  const MenuCategory = ({ icon, backgroundColor, category, categories_id }) => (
    <TouchableOpacity
      style={[styles.thumb, { backgroundColor }]}
      onPress={() =>
        navigation.navigate('Category', {
          category: category,
          categories_id: categories_id,
        })
      }>
      <Icon name='archive' color={'black'} size={48} />
    </TouchableOpacity>
  );

  return (
    <View style={MainStyle.container}>
      <View>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.textSub}>Search Pasta, Bread, etc</Text>
        </TouchableOpacity>
        {data.isLoading && (
          <View style={{ marginVertical: 16 }}>
            <View>
              <ActivityIndicator
                size={'large'}
                color={'#EFC81A'}
                style={{ alignSelf: 'center' }}
              />
            </View>
          </View>
        )}
        <Text
          style={styles.textHeader}
          onPress={() => navigation.navigate('Popular')}>
          Popular Recipes
        </Text>
        <Text style={styles.textSub}>Popular Check</Text>
        <View style={{ height: 180, width: w }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={refreshHandler} />
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}>
            {/* Item 1 */}
            {data.data?.slice(0, 4).map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      itemId: item.id,
                    })
                  }>
                  <Image style={styles.img4} source={{ uri: item.photo }} />
                  <View style={styles.img5}>
                    <Text style={styles.textImg2}>{item.title}</Text>
                    <Text style={styles.textImg2}>{item.category}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Text style={styles.textHeader}>Browse by Categories</Text>
        <View style={{ height: 95, width: w }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.data?.reverse().map((item, index) => {
              return (
                <View key={index}>
                  <MenuCategory
                    icon={item.icon}
                    backgroundColor={item.color}
                    categories_id={item.id}
                    category={item.category_name}
                  />
                  <Text style={[styles.textSub, { alignSelf: 'center' }]}>
                    {item.category_name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Text style={styles.textHeader}>Popular for You</Text>
        <View style={{ height: 180, width: w }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}>
            {/* Item 1 */}
            {data.data?.slice(0, 4).map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      itemId: item.id,
                    })
                  }>
                  <Image style={styles.img2} source={{ uri: item.photo }} />
                  <View style={styles.img3}>
                    <Text style={styles.textImg}>{item.title}</Text>
                    <Text style={styles.textImg}>{item.category}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
