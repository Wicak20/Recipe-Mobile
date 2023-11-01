/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {MainStyle} from '../../AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getMyRecipe, deleteRecipe} from '../../storages/actions/recipeAction';
export default function MyRecipeView({navigation}) {
  const token = useSelector(state => state.auth.data.data.accessToken);
  const data = useSelector(state => state.my);
  const deleteState = useSelector(state => state.del);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyRecipe(token));
  }, [dispatch, token]);

  const delAlert = id =>
    Alert.alert(
      'Delete Alert',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete canceled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () =>
            dispatch(deleteRecipe(token, id)).then(() => {
              dispatch(getMyRecipe(token));
            }),
        },
      ],
    );
  const refreshHandler = () => {
    setRefresh(true);
    setTimeout(() => {
      dispatch(getMyRecipe(token)).then(() => {
        setRefresh(false);
      });
    }, 1000);
  };

  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <Text style={MainStyle.headerText}>My Recipes</Text>
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
        {deleteState.isLoading && (
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
          data={data.data}
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
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[styles.btn, {backgroundColor: '#30C0F3'}]}
                    onPress={() =>
                      navigation.navigate('Edit', {
                        itemId: item.id,
                      })
                    }>
                    <Text style={styles.btntext}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, {backgroundColor: '#F57E71'}]}
                    onPress={() => delAlert(item.id)}>
                    <Text style={styles.btntext}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
    marginVertical: 6,
    marginLeft: 10,
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
});
