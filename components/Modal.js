import React, {useEffect, useRef} from 'react'
import { Animated, Button, useWindowDimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    ...StyleSheet.absoluteFill
  }
})

const Modal = ({ closeModal, percentOfScreen, children }) => {
  const { height: windowHeight } = useWindowDimensions()
  const modalAnim = useRef(new Animated.Value(windowHeight)).current

  const fadeUp = () => {
    Animated.timing(modalAnim, {
      toValue: windowHeight * percentOfScreen,
      duration: 500,
      useNativeDriver: false
    }).start()
  }

  const fadeDown = () => {
    Animated.timing(modalAnim, {
      toValue: windowHeight,
      duration: 500,
      useNativeDriver: false
    }).start(() => closeModal())
  }
  
  useEffect(() => {
    fadeUp()
  }, [])

  return (
    <Animated.ScrollView style={{...styles.modalContainer, top: modalAnim}}>
      <Button title="Go Back" onPress={fadeDown} />
      {children}
    </Animated.ScrollView>
  )
}

export default Modal