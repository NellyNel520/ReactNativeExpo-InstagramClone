import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Modal,
	SafeAreaView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase, db } from '../../firebase'
import AllComments from './AllComments'
import ModalHeader from './ModalHeader'

const CommentSection = ({ post, setModalVisible, modalVisible }) => {
	const [comments, setComments] = useState([])
	

	useEffect(() => {
		db.collection('posts')
			.doc(post.id)
			.collection('comments')
			.onSnapshot((snapshot) => {
				setComments(
					snapshot.docs.map((comment) => ({
						id: comment.id,
						...comment.data(),
					}))
				)
			})
	}, [])

	

	const ViewComments = ({ post, comments }) => (
		<View style={{ marginTop: 8 }}>
			<Modal
				animationType="slide"
				transparent={true}
				// presentationStyle="FormSheet"
				visible={modalVisible}
			>
				<View
					style={{
						// marginHorizontal: 20,
						marginTop: 280,
						backgroundColor: '#5A5A5A',
						flex: 1,
					}}
				>
					<View style={{}}>
						{/* view all comments header (on press hide modal) */}
						{/* <CommentHeader modalVisible={modalVisible} /> */}
						<ModalHeader
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
						/>
						{/* all comments */}
						<AllComments post={post} comments={comments} />
					</View>
				</View>
			</Modal>

			{/* on press make modal visable */}
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				{!!comments.length && (
					<Text style={{ color: 'gray', fontWeight: 600 }}>
						View {comments.length > 1 ? 'all ' : ''}
						{comments.length} {comments.length > 1 ? 'comments' : 'comment'}
					</Text>
				)}
			</TouchableOpacity>
		</View>
	)

	const Comments = ({ comments }) => (
		<View>
			{comments.slice(0, 2).map((comment, index) => (
				<View key={index} style={{ flexDirection: 'row', marginTop: 3 }}>
					<Text style={{ color: 'white' }}>
						<Text style={{ fontWeight: 700 }}>{comment.user}</Text>{' '}
						{comment.comment}
					</Text>
				</View>
			))}
		</View>
	)
	return (
		<View>
			<ViewComments post={post} comments={comments} />
			<Comments comments={comments} />
		</View>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		marginTop: 10,
	},
})

export default CommentSection
