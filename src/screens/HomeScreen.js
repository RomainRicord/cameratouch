import React,{useEffect, useState,useContext} from 'react'
import {View, Text, Button, Pressable, Image,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera } from 'react-native-image-picker'
import { PictureProvider } from '../components/PictureProvider'

const HomeScreen = ({ navigation }) => {

    const [photo, setPhoto] = useState()

    const photo__ = useContext(PictureProvider)

    useEffect(() => {
        console.log(typeof(photo))
    }, [photo])

    const launchImageLibrary = async () => {
        let photo_ = null
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

            if (typeof(response.assets) == "object") {
              photo_ = response.assets[0].uri
            }

            
          
          }});

          return {photo_}
    
      }

    return (
        <View style={styles.container}>
            <View style={styles.sphere}>
                <View style={styles.topsphere}>
                    
                    {photo__.picture != null && <Image source={{uri: photo__.picture}} style={styles.topsphere} />}
                    {photo__.picture === null && <Icon name="image" size={150} color="white" />}
                </View>
                <Pressable style={styles.button} onPress={async () => {
                    
                    await launchImageLibrary().then(({photo_}) => {
                       
                        if (photo_ != null) {
                          photo__.setPicture(photo_)
                        }
                        
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
    container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(16,16,16)'},
    sphere:{width:400,height:400,borderRadius:300,display:'flex',justifyContent:'center',alignItems:'center'},
    topsphere: {width:300,height:300,borderRadius:150,backgroundColor:'rgb(64,64,64)',display:'flex',justifyContent:'center',alignItems:'center'},
    button:{position:'absolute',right:100,bottom:50,borderRadius:50,backgroundColor:'red'},
    viewbutton:{width:50,height:50,borderRadius:50,display:'flex',justifyContent:'center',alignItems:'center'}
})