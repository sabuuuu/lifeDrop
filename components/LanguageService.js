import AsyncStorage from "@react-native-async-storage/async-storage";
import  i18n  from "i18next";

const saveUserLanguagePrefrence = async (language) => {
    try {
        await AsyncStorage.setItem('userLanguage', language);
    } catch (e) {
        console.log('Error saving user language preference:',e);
    }
};

const getUserLanguagePrefrence = async () => {
    try {
        const userLanguage = await AsyncStorage.getItem('userLanguage');
        return userLanguage || 'defaultLanguage';
    } catch (e) {
        console.log('Error getting user language preference:',e);
        return 'defaultLanguage';
    }
};

const setUserLanguage = async (language) => {
    await i18n.changeLanguage(language);
    await saveUserLanguagePrefrence(language);
};

export { getUserLanguagePrefrence, setUserLanguage };