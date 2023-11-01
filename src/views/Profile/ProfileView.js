import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MainStyle } from '../../AppStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../storages/actions/authAction';
export default function ProfileView({ navigation }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return (
    <View style={MainStyle.container}>
      <View style={styles.main}>
        {auth.data.data.photo === null ? (
          <Image
            style={styles.img}
            source={{
              uri: 'https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png',
            }}
          />
        ) : (
          <Image
            style={styles.img}
            source={{
              uri: auth.data.data?.image,
            }}
          />
        )}
        <Text style={styles.namelabel}>
          {auth.data.data?.name ?? 'fullname'}
        </Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.tabTop}
          onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="person-outline" color={'#EFC81A'} size={25} />
          <Text style={styles.label}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('MyMenu')}>
          <Icon name="book-outline" color={'#EFC81A'} size={25} />
          <Text style={styles.label}>My Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="bookmark-outline" color={'#EFC81A'} size={25} />
          <Text style={styles.label}>Saved Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="thumbs-up-outline" color={'#EFC81A'} size={25} />
          <Text style={styles.label}>Liked Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => dispatch(logoutUser())}>
          <Icon name="exit-outline" color={'maroon'} size={25} />
          <Text style={styles.label}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#EFC81A',
    height: 300,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    zIndex: 1,
    marginTop: -40,
    marginHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ffffff',
    height: Dimensions.get('window').height,
    width: 367,
    alignItems: 'center',
    elevation: 10,
  },
  tabTop: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 64,
    width: 367,
    marginVertical: 14,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    height: 64,
    width: 367,
    marginTop: 7,
    paddingHorizontal: 30,
    flexDirection: 'row',
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
});
