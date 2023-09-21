import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
// components 
import Header from '../components/post/Header'


const PostScreen = ({navigation, route}) => {
  const { post } = route.params
  return (
    <SafeAreaView style={styles.container}>
    <Header post={post} navigation={navigation} />
    {/* <Post post={post} currentUser={currentUser}/> */}
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
})

export default PostScreen