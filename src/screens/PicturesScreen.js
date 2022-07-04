import React,{ useEffect, useState } from "react";
import {Button,PermissionsAndroid, Platform,FlatList,Image, View} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { SafeAreaView } from 'react-native-safe-area-context';

const PicturesScreen = () => {


    const [photos, setPhotos] = useState([]);

    const hasAndroidPermission = async () => {

        const permission_write = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const permission_read = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const permission_camera = PermissionsAndroid.PERMISSIONS.CAMERA;
      
        const hasPermission_write = await PermissionsAndroid.check(permission_write);
        const hasPermission_read = await PermissionsAndroid.check(permission_write);
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

        console.log("photos", photos);


        setPhotos(photos);
        console.log(photos.edges[0].node.image.uri)
    }

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
        
            {photos.edges != null && photos.edges.length > 0 &&

            <FlatList
                data={photos.edges}
                renderItem={({ item }) => (
                <Image source={{ uri: item.node.image.uri }} style={{ width: 100, height: 100 }} />
                )}
                keyExtractor={item => item.node.image.uri}
                numColumns={4}
            />

            }
    </View>
    );
}

export default PicturesScreen;