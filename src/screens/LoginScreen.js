import React,{useContext} from 'react'
import { StyleSheet,View,Text,Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ReactNativeBiometrics from 'react-native-biometrics'
import Realm from 'realm'
import {PictureProvider} from '../components/PictureProvider'
import {UserSchema} from '../realm/Schema/UserSchema'
const rnBiometrics = new ReactNativeBiometrics()

const LoginScreen = ({navigation}) => {

    const photo_ = useContext(PictureProvider)

    const connexion = async () => {

        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
        
        await rnBiometrics.createSignature({promptMessage: 'Sign in',payload: payload})
        .then((resultObject) => {
            const { success, signature } = resultObject

            if (success) {

                console.log("SUCESS",success)
            
                navigation.navigate('HomeScreen')

            } else {
                console.log('user cancelled biometric prompt')
            }
        })
        .catch((error) => {
            console.log('biometrics failed',error)
        })

    }

    const inscription = async () => {

        await rnBiometrics.createKeys()
        .then(async (resultObject) => {
            const { publicKey } = resultObject

            navigation.navigate("HomeScreen")
        })
        .catch((error) => {
            console.log(error)
        })

    }


    return (
        <View style={styles.container}>
            <Text style={styles.textcolor}>Connexion par empreinte digital</Text>

            <Pressable style={styles.button} onPress={connexion}>
                <Icon name="fingerprint" size={100} color="cyan" />
            </Pressable>
            <Text style={styles.textcolor}>Inscription par empreinte digital</Text>
                <Pressable style={styles.button} onPress={inscription}>
                <Icon name="fingerprint" size={100} color="cyan" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(16,16,16)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textcolor:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,
        marginBottom:20
    }
});

export default LoginScreen