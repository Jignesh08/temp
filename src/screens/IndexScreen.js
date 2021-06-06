import React, { useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IndexScreen = ({navigation}) => {
    console.log("Hello Wolrd");
    const {state, deleteBlogPost, getBlogPost} = useContext(Context);

    useEffect(() => {
        getBlogPost();

    const listener = navigation.addListener('didFocus',() => {
        getBlogPost();
    })

    return () => {
        listener.remove();
    }
    }, [])

    return <View>
        <FlatList 
            data = {state}
            keyExtractor = {(blogPost) => blogPost.title}
            renderItem = {({item}) => {
                return (
                <TouchableOpacity onPress = {() => navigation.navigate('Show', { id : item.id}) } >
                    <View style = {styles.row} >
                        <Text style = {styles.title} >{item.title} - {item.id}</Text>
                        <TouchableOpacity onPress = {() => deleteBlogPost(item.id)}>
                            <Feather style = {styles.icon} name = 'trash'/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                )
            }}
        />
    </View>
}

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name='plus' size={30}/>
          </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : 15,
        paddingHorizontal : 10,
        borderWidth : 1,
        borderColor : "grey"
    },
    title : {
        fontSize : 18
    },
    icon : {
        fontSize : 24
    }
});

export default IndexScreen;