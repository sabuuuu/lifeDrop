import React , {useEffect}from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import Donner from './screens/donner';
import Besoin from './screens/besoin';
import Recherche from './screens/recherche';
import InformationsUtiles from './screens/informationsUtiles';
import Contact from './screens/contact';
const Stack = createNativeStackNavigator();

import 'intl-pluralrules';
import  i18n  from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './translation/ar.json';
import fr from './translation/fr.json';

import { getUserLanguagePrefrence,setUserLanguage } from './components/LanguageService';

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: fr
    },
    ar: {
      translation: ar
    }
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false
  }
})
export default function App() {
    useEffect(() => {
    async function initializeApp(){
      const userLanguage = await getUserLanguagePrefrence();
      i18n.changeLanguage(userLanguage);
    }

    initializeApp();
  },[]);
  
  const [loaded] = useFonts({
    Reg: require("./assets/fonts/fregular.ttf"),
    Bol: require("./assets/fonts/fbold.ttf"),
  })
  if (!loaded) {
    return null;
  }
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false ,animation:'none'}}/>
        <Stack.Screen name="Besoin" component={Besoin} options={{headerShown:false ,animation:'none'}}/>
        <Stack.Screen name="Recherche" component={Recherche} options={{headerShown:false ,animation:'none'}}/>
        <Stack.Screen name="Donner" component={Donner} options={{headerShown:false,animation:'none' }}/>
        <Stack.Screen name="InformationsUtiles" component={InformationsUtiles} options={{headerShown:false ,animation:'none'}}/>
        <Stack.Screen name="Contact" component={Contact} options={{headerShown:false ,animation:'none'}}/>
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

