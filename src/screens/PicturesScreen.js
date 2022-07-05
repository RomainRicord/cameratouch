import React,{ useEffect, useState,useContext } from "react";
import {Button,PermissionsAndroid, Platform,FlatList,Image, View, Pressable} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { SafeAreaView } from 'react-native-safe-area-context';
import { PictureProvider } from "../components/PictureProvider";
import { Navigation } from "react-native-navigation";

const PicturesScreen = ({navigation}) => {


    const [photos, setPhotos] = useState([]);

    const photo = useContext(PictureProvider);

    const hasAndroidPermission = async () => {

        const permission_write = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const permission_read = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const permission_camera = PermissionsAndroid.PERMISSIONS.CAMERA;
      
        const hasPermission_write = await PermissionsAndroid.check(permission_write);
        const hasPermission_read = await PermissionsAndroid.check(permission_read);
        const hasPermission_camera = await PermissionsAndroid.check(permission_camera);
        if ((hasPermission_write) && (hasPermission_read) && (hasPermission_camera)) {
          return true;
        }
      
        const status = await PermissionsAndroid.requestMultiple([permission_write, permission_read, permission_camera]);
        return status === 'granted';
      }

    const getPhotos = async () => {
        console.log("Getting photos");
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
        }

        const photos = await CameraRoll.getPhotos({
            first: 40,
            assetType: 'All',
        });

        setPhotos(photos);
    }

    useEffect(() => {
        getPhotos();
        console.log("photo",photo)
    }, []);

    return (
        <View style={{ flex:1,justifyContent:'center',alignItems:'center' ,backgroundColor:'rgb(16,16,16)'}}>
        
            {photos.edges != null && photos.edges.length > 0 &&

            <FlatList
                data={photos.edges}
                renderItem={({ item }) => (
                    <Pressable style={{ width: 100, height: 100 }} onPress={ async () => {
                            await photo.setPicture(item.node.image.uri)
                            navigation.navigate('HomeScreen')
                        }}>
                        <Image source={{ uri: item.node.image.uri }} style={{ width: 100, height: 100 }} />
                    </Pressable>
                )}
                keyExtractor={item => item.node.image.uri}
                numColumns={4}
            />

            }
    </View>
    );
}

export default PicturesScreen;