import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import fr from "../api/infosFr.json";
import ar from "../api/infos.json";
import UsefulInfo from "../components/infoUtilesRender";


export default function InformationsUtiles({ navigation }) {
    const [lang, setLang] = useState('fr');

    const changeLang = () => {
        if (lang == 'fr') {
            setLang('ar');
        } else {
            setLang('fr');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Informations Utiles</Text>
            
                {/* change language */}
                <TouchableOpacity style={styles.change} onPress={changeLang}>
                    <Image source={require('../assets/change.png')}style={styles.changeImg} />
                    <Text style={styles.changeText} >Langue</Text>
                </TouchableOpacity>
            </View>

            {/* passing data to the component */}
            <View style={styles.body}>
                <UsefulInfo data={lang == 'fr' ? fr : ar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#D0362F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: '11%',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    titleText: {
        color: '#FFF3DE',
        fontFamily: 'Bol',
        fontSize: 20,
        marginRight: '10%',
        marginLeft: '18%',
    },
    body: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF3DE',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: '4%',
        paddingTop: '4%',
    },
    change: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeText: {
        color: '#FFF3DE',
        fontFamily: 'Reg',
        fontSize: 9,
    },
    changeImg: {
        width: 18,
        height: 18,
    },
});