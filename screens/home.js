import React,{ useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../firebase';
import { Linking } from 'react-native';

import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';

const openExternalLink = (url) => {
  Linking.openURL(url)
    .then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

export default function Home({ navigation }) {
  const [donorCount, setDonorCount] = useState(0);
  const { t } = useTranslation();
 
  useEffect(() => {
    const donorsCollectionRef = firebase.firestore().collection('informations donneurs');
    // Use Firestore's .get() method to get all documents in the collection
    donorsCollectionRef
      .get()
      .then((querySnapshot) => {
        // Set the donorCount state to the number of documents in the collection
        setDonorCount(querySnapshot.size);
      })
      .catch((error) => {
        console.error('Error fetching donor count:', error);
      });
  }, []);

return (
      <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.interieur}>
        {/* pour contenir le logo et le nom de l'application  */}
      <View style={styles.logoContainer}>
        <LanguageToggle />
        <TouchableOpacity  style={styles.logoFb} onPress={() => openExternalLink('https://m.facebook.com/profile.php/?id=100064677491453')}>
            <Image  style={styles.logoFbImg} source={require('../assets/fb.png')} />
        </TouchableOpacity>
        <Image  style={styles.logoImage} source={require('../assets/logo.png')} />
        
      </View>

      {/* pour contenir les boutons pour choisir une action */}
      <View style={styles.bodyContainer}>
        <View style={styles.buttonContainer}>
        <Text style={styles.text}>{t('homeTitle')}</Text>
          <TouchableOpacity style={styles.bouton}  onPress={() => navigation.navigate('Donner')}>
            <Text style={styles.boutonText}>{t('buttonOne')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bouton}  onPress={() => navigation.navigate('Recherche')}>
            <Text style={styles.boutonText}>{t('buttonTwo')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.contact}  onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.contactText}>{t('contact')}</Text>
        </TouchableOpacity>
          
        {/* le compteur et les infos utiles */}
        <View style={styles.infoContainer}>
          <View style={styles.compteur}>
            <Text style={styles.compteurText}>{t('nombreInscrits')} {donorCount}</Text>
          </View>
          <View >
            <TouchableOpacity style={styles.infos}  onPress={() => navigation.navigate('InformationsUtiles')}>
              <Ionicons name="help-circle-outline" size={35} color="white" />
              <Text style={styles.infoText} >{t('informations')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFF3DE',
    paddingTop: 0,
  },
  logoContainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: '2%',
  },
  logoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  logoText: {
    fontFamily: 'Reg',
    alignSelf: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  bouton: {
    width: '80%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    margin:'4%',
    marginTop:8,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#52006A',
  },
  boutonText: {
    color:'#D0362F',
    fontFamily: 'Bol',
    fontSize: 20,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor:'#D0362F',
    borderTopLeftRadius:90,
    borderTopRightRadius:90,
    marginTop: '7.60%',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Bol',
    fontSize: 24,
    marginTop: '10%',
    marginBottom: '6%',
    color:'white',
  },
  infoContainer: {
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
    padding: '2%',
    marginTop: "2%",
  },
  contact: {
    width: '70%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0362F',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 14,
    margin:'4%',
    marginTop:'37.5%',
    alignSelf: 'center',
  },
  contactText: {
    color:'white',
    fontFamily: 'Reg',
    fontSize: 15,
  },
  langue: {
    alignSelf: 'flex-end',
    marginTop: '8%',
    marginRight: '2%',
  },
  interieur: {
    width: '100%',
    height: '100%',
  },
  compteur: {
    width: '45%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compteurText: {
    fontFamily: 'Bol',
    fontSize: 12,
    alignSelf: 'center',
    color:'#C0564B',
  },
  infoText: {
    fontFamily: 'Reg',
    color: '#FFF3DE',
    fontSize: 10,
    marginBottom: '6%',
  },
  infos: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFb: {
    alignSelf: 'flex-start',
    marginLeft: '3%',
    marginTop:-8
  },
  logoFbImg: {
    width: 35,
    height: 32,
  }
});
