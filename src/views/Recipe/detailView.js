/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MainStyle } from '../../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRecipe } from '../../storages/actions/recipeAction';
export default function DetailView({ route, navigation }) {
  const { itemId } = route.params;
  const id = JSON.stringify(itemId);
  const token = useSelector(state => state.auth.data.data.accessToken);
  const data = useSelector(state => state.detail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailRecipe(token, id));
  }, [dispatch, id, token]);
  if (data.isLoading === true) {
    return (
      <View style={MainStyle.container}>
        <View style={MainStyle.main}>
          <ActivityIndicator
            size={'large'}
            color={'#EFC81A'}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    );
  }
  if (data.data === null) {
    return (
      <View style={MainStyle.container}>
        <View style={MainStyle.main}>
          <Text>null</Text>
        </View>
      </View>
    );
  }

  const recipe = data.data || { photo: '' };
  return (
    <View style={MainStyle.container}>
      <ImageBackground
        style={styles.main}
        source={{
          uri: recipe.photo || '',
        }}
      />
      <View style={styles.titlebox}>
        <View
          style={{
            width: 240,
            maxHeight: 64,
          }}>
          <View>
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
          <Text style={styles.subtitle}>By {recipe.author}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            maxHeight: 64,
            alignItems: 'center',
            marginStart: 16,
          }}>
          <TouchableOpacity style={styles.btn}>
            <Icon name="bookmark" size={23} color="#E9E9E8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Icon name="thumbs-up" size={23} color="#E9E9E8" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <View
          style={{
            padding: 10,
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
          }}>
          <Text style={{ marginTop: 10 }}>Ingredients: </Text>
          <Text style={{ marginTop: 10 }}>{recipe.ingredients}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 300,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  card: {
    zIndex: 1,
    marginTop: -10,
    marginHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 15,
  },
  namelabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  titlebox: {
    zIndex: 2,
    marginTop: -85,
    marginBottom: 40,
    marginLeft: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 48,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 18,
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
