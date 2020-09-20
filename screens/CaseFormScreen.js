import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { addCase } from '../actions/casesActions'
import Modal from '../components/Modal'
import BACKEND_URL from '../constants/BACKEND_URL'

const CaseFormScreen = ({ incidentId, closeModal, addCase }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState({})

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

  const isValidForm = () => {
    return !!( title.length > 0 && description.length > 0 && image.uri)
  }

  const handleSubmit = () => {
    if (!isValidForm()) {
      Alert.alert(
        'Form Invalid',
        'Please fill out all form fields and add an image'
        )
      return
    }
    const [imageName, imageType] = image.uri.split('.')
    const form = new FormData()
    form.append('case[incident_id]', incidentId)
    form.append('case[title]', title)
    form.append('case[description]', description)
    form.append('case[media]', {
      uri: image.uri,
      name: `${title}.${imageType}`,
      type: `image/${imageType}`
    })

    fetch(`${BACKEND_URL}/cases`, {
      method: 'POST',
      body: form
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.errors) {
        addCase(json)
        closeModal()
      } else {
        Alert.alert(
          'Server Error',
          'There was a problem submitting your case, please try again.'
        )
      }
    })
    .catch(err => Alert.alert('Fetch Error', err))
  }

  return (
    <Modal closeModal={closeModal} percentOfScreen={0.06}>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Title:</Text>
          <Text style={styles.subheader}>A short description of the incident</Text>
          <TextInput style={styles.inputText} maxLength={30} onChangeText={setTitle} value={title} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Description:</Text>
          <Text style={styles.subheader}>Describe the incident in full detail</Text>
          <TextInput style={styles.inputText} multiline onChangeText={setDescription} value={description} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.header}>Image:</Text>
          <Text style={styles.subheader}>Add an image on the incident</Text>
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
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    fontSize: 15
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

export default connect(null, { addCase })(CaseFormScreen)
