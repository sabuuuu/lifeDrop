import React ,{useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet,TextInput,TouchableOpacity ,Image,ScrollView} from 'react-native';
import firebase from "../firebase";
import NotifMessage from './notifMessages';

export default function Contact() {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [validationErrorMessage, setValidationErrorMessage] = useState('');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();

    const envoyerMessage = () => {
        let hasErrors = false;
        if (!nom.trim() || !email.trim() || !message.trim()) {
            setValidationErrorMessage('veuillez remplir tout les champs avant de valider');
            hasErrors = true;
        }
        if (hasErrors) {
            return;
        }

        const Message = {
            nom,
            email,
            message
        }

        firebase.firestore().collection('messages').add(Message).then(() => {
            console.log('message envoyé');
            setSuccessModalVisible(true);
            setNom('');
            setEmail('');
            setMessage('');
        }).catch((error) => {
            console.log('erreur lors de lenvoi du message',error);
            setErrorMessage("Une erreur est parvenu lors de l'envoi du message");
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.interieur}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>{t('contact')}</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.adresseContainer}>
                    <View style={styles.adresse}>
                        <Image source={require('../assets/adress.png')} style={styles.image}/>
                        <Text style={styles.textAdress}>
                            rafik.bdoc@gmail.com
                        </Text>
                    </View>
                    <View style={styles.tel}>
                        <Image source={require('../assets/tel.png')} style={styles.image}/>
                        <Text style={styles.textAdress}>
                            0558 70 20 42
                        </Text>
                    </View>
                </View>
                
                <View style={styles.annonceContainer}>
                        <Text style={styles.annonce} >{t('rib')}</Text>
                        <Text style={styles.annonceText} >Rib BNA Agence 365 n° 001.00356.0200.002.865/85</Text>
                </View>

                    <Text style={styles.text}>
                        {t('donnerNom')} *
                    </Text>
                    <TextInput style={styles.input} 
                                placeholder={t('vNom')} 
                                autoCapitalize="none"  
                                onChangeText={(text) => {setNom(text); setValidationErrorMessage('');}}
                                value={nom}/>

                    <Text style={styles.text}>
                        {t('email')} *
                    </Text>
                    <TextInput style={styles.input} 
                                placeholder={t('vEmail')} 
                                autoCapitalize="none"
                                onChangeText={(text) => {setEmail(text); setValidationErrorMessage('');}} 
                                value={email}/>

                    <Text style={styles.text}>
                        {t('message')} *
                    </Text>
                    <TextInput
                        style={styles.bigInput}
                        underlineColorAndroid="transparent"
                        placeholder={t('vMessage')}
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => {setMessage(text); setValidationErrorMessage('');}} 
                        value={message}/>

                    <TouchableOpacity style={styles.bouton} onPress={envoyerMessage}>
                        <Text style={styles.boutonText}>{t('envoyer')}</Text>
                        <NotifMessage visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} />
                    </TouchableOpacity>
                    {validationErrorMessage ? (
                    <Text style={styles.errorText}>{validationErrorMessage}</Text>
                ) : null}
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>developed by Yafa Sabrina | Touazi Sirem</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0362F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        justifyContent: 'center',
        width: '100%',
        margin: '5%',
        paddingTop: '4%',
    },
    textHeader: {
        fontFamily: 'Bol',
        alignSelf: 'center',
        color: '#FFF3DE',
        fontSize: 22,
    },
    body: {
        flex: 1,
        backgroundColor:'#FFF3DE',
        width: '100%',
        height: '100%',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        padding: '5%',
        paddingTop: '6%',
        alignContent: 'center',
    },
    interieur:{
        height: '100%',
        width: '100%',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        fontFamily: "Reg",
        backgroundColor: 'white',
        borderRadius: 8,
        paddingLeft: 9,
        paddingRight: 9,
        fontSize: 14,
        marginBottom: '5%',
    },
    bigInput: {
        height: "28%",
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        fontFamily: "Reg",
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        paddingTop: 15,
        fontSize: 14,
        marginBottom: '10%',
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    boutonText: {
        fontFamily: "Bol",
        color: 'white',
        fontSize: 18,   
    },
    bouton: {
        width: '80%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0362F',
        borderRadius: 14,
        margin:'4%',
        marginTop:'2%',
        alignSelf: 'center',
        elevation: 8,
        shadowColor: '#52006A',
        marginBottom: ' 25%',
    },
    text: {
        fontFamily: "Bol",
        color: '#D0362F',
        fontSize: 15,
        marginBottom: '3%',
    },
    footer: {
        height: '3%',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: '2%',
    },
    footerText: {
        fontFamily: "Reg",
        color: '#FFF3DE',
        fontSize: 10,
        alignSelf: 'center',
    },
    errorText: {
        fontFamily: "Reg",
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom:'3%',
    },
    image: {
        width: 24,
        height: 24,
        alignSelf: 'center',
    },
    adresseContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        padding: '1%',
        marginBottom: '3%',
    },
    adresse: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        margin: '3%',
    },
    tel: {
        flexDirection: 'row',
        margin: '5%',
    },
    textAdress: {
        fontFamily: "Bol",
        color: '#402E32',
        fontSize: 14,
        marginBottom: '3%',
        alignSelf: 'center',
    },
    annonceContainer: {
        borderColor: '#C0564B',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: '5%',
        padding: 5,
        width: '90%',
        alignSelf: 'center',
    },
    annonce: {
        fontFamily: "Bol",
        color: '#C0564B',
        fontSize: 13,
        alignSelf: 'center',
        marginBottom:'2%',
    },
    annonceText: {
        fontFamily: "Reg",
        color: '#C0564B',
        fontSize: 12,
        alignSelf: 'center',
    }
})