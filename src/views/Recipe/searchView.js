/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {MainStyle} from '../../AppStyles';
import {useSelector, useDispatch} from 'react-redux';
import {getAllRecipe} from '../../storages/actions/recipeAction';
export default function SearchView({navigation}) {
  const token = useSelector(state => state.auth.data.data.accessToken);
  const data = useSelector(state => state.all.data);
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [refresh, setRefresh] = useState(false);
  const refreshHandler = () => {
    setRefresh(true);
    setTimeout(() => {
      dispatch(getAllRecipe(token)).then(() => {
        setRefresh(false);
      });
    }, 1000);
  };
  const selectedData = () => {
    if (data) {
    return data
      .filter((item) => item.title.includes(search))
  } else {
    return [];
  }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipe(token));
  }, [dispatch, token, search]);
  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for Recipes"
          onChangeText={value => setSearch(value)}
        />
        {data.isLoading && (
          <View style={{marginVertical: 16}}>
            <View>
              <ActivityIndicator
                size={'large'}
                color={'#EFC81A'}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>
        )}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={refreshHandler} />
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={selectedData()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('Detail', {
                  itemId: item.id,
                })
              }>
              <Image
                style={styles.img}
                source={{
                  uri: item.photo,
                }}
              />
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.title}>{item.category}</Text>
                <Text style={styles.title}>By {item.author}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 319,
    height: 50,
    fontSize: 14,
    fontWeight: '500',
  },
  item: {
    marginTop: 16,
    paddingLeft: 10,
    width: 343,
    height: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 3,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
    marginLeft: 50,
    backgroundColor: '#EFC81A',
    height: 32,
    width: 64,
    borderRadius: 6,
  },
  btntext: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: 'white',
  },
  spinner: {
    flex: 1,
    height: 64,
    marginVertical: 16,
    marginHorizontal: 16,
    alignContent: 'center',
    backgroundColor: 'red',
  },
});
