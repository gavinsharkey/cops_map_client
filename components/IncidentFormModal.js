import React, { useState, useEffect, useRef } from 'react'
import { Animated, View, Text, TextInput, StyleSheet, useWindowDimensions, Button, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const IncidentFormModal = ({closeModal}) => {
  const { height: windowHeight, width: windowWidth} = useWindowDimensions()
  const modalAnim = useRef(new Animated.Value(windowHeight)).current

  const [locationDesc, setLocationDesc] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})

  const fadeUp = () => {
    Animated.timing(modalAnim, {
      toValue: windowHeight * 0.08,
      duration: 500,
      useNativeDriver: false
    }).start()
  }

  const pickImage = () => {
    ImagePicker.requestCameraRollPermissionsAsync()
    .then(resp => {
      if (resp.granted) {
        ImagePicker.launchImageLibraryAsync()
        .then(resp => {
          if (!resp.cancelled) {
            setImage(resp)
          }
        })
      }
    })
  }

  console.log(image)

  // const fadeDown = () => {
  //   Animated.timing(modalAnim, {
  //     toValue: windowHeight,
  //     duration: 500,
  //     useNativeDriver: false
  //   }).start()
  // }

  useEffect(() => {
    fadeUp()
  }, [])

  return (
    <Animated.ScrollView style={{...styles.modalContainer, top: modalAnim}}>
      <Button title="Go Back" onPress={closeModal} />
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Describe location:</Text>
          <Text style={styles.subheader}>A short description of the location</Text>
          <TextInput style={styles.inputText} onChangeText={setLocationDesc} value={locationDesc} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Title:</Text>
          <Text style={styles.subheader}>A short description of the incident</Text>
          <TextInput style={styles.inputText} onChangeText={setTitle} value={title} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Description:</Text>
          <Text style={styles.subheader}>Describe the incident in full detail</Text>
          <TextInput style={styles.inputText} onChangeText={setDescription} value={description} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Image:</Text>
          <View style={styles.imageBox}>
            <TouchableOpacity onPress={pickImage}>
              {image.uri
              ? <Image style={{width: '100%', height: 300, resizeMode: 'contain'}} source={{uri: image.uri}} />
              : <Text style={styles.imageBoxPlaceholder}>Press to add an image of the incident</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.inputGroup, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    ...StyleSheet.absoluteFillObject
  },
  container: {
    marginVertical: '10%'
  },
  inputGroup: {
    paddingBottom: 20
  },
  header: {
    fontSize: 20,
    fontWeight: '700'
  },
  subheader: {
    fontSize: 15,
    fontWeight: '500'
  },
  inputText: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 30,
    fontSize: 20
  },
  imageBox: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ddd'
  },
  imageBoxPlaceholder: {
    margin: 30,
    textAlign: 'center'
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#243447',
    borderRadius: 30,
    flex: 1
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20
  }
})

export default IncidentFormModal