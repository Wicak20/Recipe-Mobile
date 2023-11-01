/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MainStyle } from '../../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRecipe,
  // sendNotifs,
  getCategories,
} from '../../storages/actions/recipeAction';
export default function AddView() {
  const dispatch = useDispatch();
  const [filePath, setFilePath] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

  const token = useSelector(state => state.auth.data.data.accessToken);
  const users_id = useSelector(state => state.auth.data.data.id);
  const data = useSelector(state => state.add);
  const categories = useSelector(state => state.categories);
  const [posted, setPosted] = useState(false);
  const isFocused = useIsFocused();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [categories_id, setCategories_id] = useState(2);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    setPosted(false);
    if (isFocused) {
      setTitle('');
      setIngredients('');
      setFilePath(null);
    }
  }, [isFocused]);
  const postForm = e => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter Recipe title');
      return;
    }

    if (ingredients.trim() === '') {
      Alert.alert('Error', 'Please enter Recipe ingredients');
      return;
    }

    if (!filePath) {
      Alert.alert('Error', 'Please select a photo');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('category_id', parseInt(categories_id, 10));
    // formData.append('users_id', users_id);
    formData.append('image', {
      uri: filePath,
      type: fileType,
      name: fileName,
    });
    console.log(formData);
    dispatch(addRecipe(token, formData)).then(() => {
      setPosted(true);
      // dispatch(sendNotifs());
    });
  };
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
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
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        cameraLaunch();
      } else {
        alert('Camera Permission not granted');
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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

  return (
    <View style={MainStyle.container}>
      <View style={MainStyle.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={MainStyle.headerText}>Add Your Recipe</Text>
          {categories.isLoading && (
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
          <Text style={styles.label}>Title</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            style={styles.inputLarge}
            placeholder="Ingredients"
            value={ingredients}
            onChangeText={value => setIngredients(value)}
          />
          <Text style={styles.label}>Photo Preview</Text>
          {filePath === null ? (
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dx6mvwpti/image/upload/v1698527132/coocking_lffbzy.jpg',
              }}
              style={{
                width: 319,
                height: 200,
                alignSelf: 'center',
                borderRadius: 16,
                backgroundColor: 'grey',
              }}
            />
          ) : (
            <Image
              source={{ uri: filePath }}
              style={{
                width: 319,
                height: 200,
                alignSelf: 'center',
                borderRadius: 16,
                backgroundColor: 'grey',
                marginBottom: 10,
              }}
            />
          )}
          <Text style={styles.label}>Upload Photo</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 319,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn2}
              onPress={() => requestCameraPermission()}>
              <Text style={styles.btnlabel}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn2}
              onPress={() => chooseFile('photo')}>
              <Text style={styles.btnlabel}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Category</Text>
          <Picker
            style={styles.input}
            selectedValue={categories_id}
            onValueChange={item => setCategories_id(item)}>
            {categories.data?.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.category_name}
                value={item.category_id}
              />
            ))}
          </Picker>
          {posted && (
            <Text style={styles.label}>Recipe Added Successfully! </Text>
          )}
          {data.isError && (
            <Text style={styles.label}>{data.data.message}</Text>
          )}
          <TouchableOpacity style={styles.btn} onPress={postForm}>
            <Text style={styles.btnlabel}>
              {data.isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                'POST'
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputLarge: {
    marginBottom: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 319,
    height: 200,
    elevation: 5,
  },
  label: {
    marginVertical: 10,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#EFC81A',
    padding: 10,
    borderRadius: 15,
    width: 183,
    height: 50,
    marginBottom: 16,
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFC81A',
    padding: 10,
    borderRadius: 15,
    width: 100,
    height: 50,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  btnlabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: 'white',
  },
});
