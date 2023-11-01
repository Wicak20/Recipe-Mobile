/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { MainStyle } from '../../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { logoutUser } from '../../storages/actions/authAction';
import { editProfile } from '../../storages/actions/userAction';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useEffect } from 'react';
export default function EditProfileView({ navigation }) {
  const auth = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.auth.data.data.accessToken);
  const data = useSelector(state => state.editprofile);
  const [fullname, setFullname] = useState(auth.data.data.name);
  const [email, setEmail] = useState(auth.data.data.email);
  const [posted, setPosted] = useState(false);
  const [filePath, setFilePath] = useState(auth.data.data.photo);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);
  useEffect(() => {
    setPosted(false);
    if (isFocused) {
      setPosted(false);
    }
  }, [isFocused]);
  const dispatch = useDispatch();
  const chooseFile = type => {
    let options = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('Upload photo canceled');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode === 'permission') {
        alert('Permission not granted');
        return;
      } else if (response.errorCode === 'others') {
        alert(response.errorMessage);
        return;
      }
      let assets = response.assets[0];

      console.log('fileName = ', assets.fileName);
      console.log('type = ', assets.type);
      console.log('uri = ', assets.uri);
      setFilePath(assets.uri);
      setFileName(assets.fileName);
      setFileType(assets.type);
    });
  };
  const postForm = e => {
    const formData = new FormData();
    formData.append('name', fullname);
    // formData.append('email', email);
    formData.append(
      'image',
      fileName
        ? {
          uri: filePath,
          type: fileType,
          name: fileName,
        }
        : auth.data.data.photo,
    );
    console.log(formData);
    dispatch(editProfile(token, formData)).then(() => {
      setPosted(true);
      setTimeout(() => {
        dispatch(logoutUser());
      }, 1000);
    });
  };
  return (
    <View style={MainStyle.container}>
      <View style={styles.main}>
        {auth.isLoading && (
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
              uri: filePath,
            }}
          />
        )}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#30C0F3' }]}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.btnlabel}>Change Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={([styles.tab], { flexDirection: 'column', marginTop: 10 })}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={value => setFullname(value)}
          />
        </View>
        <View style={([styles.tab], { flexDirection: 'column', marginTop: 10 })}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={value => setEmail(value)}
            editable={false}
          />
        </View>
        <View style={styles.tab}>
          <Text
            style={styles.label}
            onPress={() => navigation.navigate('Reset')}>
            Change Password
          </Text>
        </View>
        {posted && <Text style={styles.label}>Edit Profile Successful!</Text>}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#EFC81A' }]}
          onPress={postForm}>
          <Text style={styles.btnlabel}>
            {data.isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              'Update'
            )}
          </Text>
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
    fontWeight: '700',
    color: 'skyblue',
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
  input: {
    marginBottom: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 319,
    height: 50,
    elevation: 5,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 15,
    width: 183,
    height: 50,
    marginVertical: 16,
  },
  btnlabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: 'white',
  },
});
