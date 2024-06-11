import React from "react";
import { TouchableOpacity,Text ,StyleSheet , Image} from "react-native";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
    const { t,i18n } = useTranslation();

    const toggleLanguage = (language) => {
        const newLanguage = i18n.language === "fr" ? "ar" : "fr";
        i18n.changeLanguage(newLanguage);
    };

    return (
        <TouchableOpacity style={styles.langue} onPress={() => toggleLanguage(i18n.language)}>
           <Image  source={require('../assets/langue.png')} style={styles.image}/>
           <Text style={styles.text}>{t('langue')}</Text>
        </TouchableOpacity>
    )
}

export default LanguageToggle;

const styles = StyleSheet.create({
    langue:{
        alignSelf: 'flex-end',
        marginTop: '8%',
        marginRight: '2%',
        height: 15,
        width: 38
    },
    text:{
        fontFamily: 'Reg',
        color: '#D0362F',
        fontSize: 8,
        alignSelf: 'center',
    },
    image:{
        alignSelf: 'center',
    }

});




