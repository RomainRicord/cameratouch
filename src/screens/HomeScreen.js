import React,{useEffect, useState} from 'react'
import {View, Text, Button, Pressable, Image,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera } from 'react-native-image-picker'

const HomeScreen = ({ navigation }) => {

    const [photo, setPhoto] = useState()

    useEffect(() => {
        console.log(typeof(photo))
    }, [photo])

    const launchImageLibrary = async () => {
        let photo_ = ""
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        await launchCamera(options, async (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {

            photo_ = response.assets[0].uri
            
            console.log("Photo",/* Getting the first image from the array of images that are returned
            from the image picker. */
            photo_)

            
          
          }});

          return {photo_}
    
      }

    return (
        <View style={styles.container}>
            <View style={styles.sphere}>
                <View style={styles.topsphere}>
                    
                    {typeof(photo) != 'undefined' && <Image source={{uri: photo}} style={styles.topsphere} />}
                    {typeof(photo) === 'undefined' && <Icon name="image" size={150} color="white" />}
                </View>
                <Pressable style={styles.button} onPress={async () => {
                    
                    await launchImageLibrary().then(({photo_}) => {
                        console.log('photo______',photo_)
                        setPhoto(photo_)
                        console.log(photo_,'photo')
                    }).catch((error) => {
                        console.log(error)
                    })
                    
                    }}>
                    <View style={styles.viewbutton}>
                        <Icon name="camera" size={30} color="white" />
                    </View>
                </Pressable>
            </View>
            <Button title='Go to Pictures' onPress={() => navigation.navigate('PicturesScreen')} />
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(34,34,34,255)'},
    sphere:{width:400,height:400,borderRadius:300,display:'flex',justifyContent:'center',alignItems:'center'},
    topsphere: {width:300,height:300,borderRadius:150,backgroundColor:'gray',display:'flex',justifyContent:'center',alignItems:'center'},
    button:{position:'absolute',right:100,bottom:50,borderRadius:50,backgroundColor:'red'},
    viewbutton:{
        width:50,height:50,borderRadius:50,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(20,204,34,255)'}
})