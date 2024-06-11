import React from "react";
import { StyleSheet, Text, View ,TouchableOpacity,FlatList ,Image,Linking} from 'react-native';
import { useTranslation } from 'react-i18next';
export default function Besoin({ route }) {
    const { searchResult } = route.params;
    const { t } = useTranslation();

    const handleCall = phoneNumber => {
        const phoneUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneUrl);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>{t('besoinTitre')}</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.Bigtitle}>{t('resultats')}</Text>
                <View style={styles.interieur}>
                <View style={styles.titles}>
                    <Text style={styles.title}>{t('donnerNom')}</Text>
                    <Text style={styles.titleNum}>{t('besoinNum')}</Text>
                    <Text style={styles.title}>{t('call')}</Text>
                </View>    
                <FlatList
                    data={searchResult}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <Text style={styles.text}>{item.nom}</Text>
                            <Text style={styles.text}>{item.num}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => handleCall(item.num)}>
                                <Image source={require('../assets/call.png')} style={styles.image}/>
                            </TouchableOpacity>
                        </View>
                )}/>
                </View>
            </View>
        </View>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#D0362F',
    },
    textHeader: {
        fontFamily: "Bol",
        color: '#FFF3DE',
        fontSize: 24,
        alignSelf: 'center',
        marginTop: '5%',
    },
    body: {
        flex: 1,
        width: '100%',
        backgroundColor:'#FFF3DE',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        alignSelf: 'center',
        width: '100%',
        height: '13%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF3DE',
        height: 55,
        borderRadius: 15,
        width: '92%',
        paddingRight: '2%',
        padding: '2%',
        marginBottom: '2%',
        marginLeft:'-7%',
        alignSelf: 'center',
    },
    text: {
        fontFamily: "Reg",
        fontSize: 14,
        marginLeft: '3%',
        color:'#402E32'
    },
    image: {
        marginBottom: 4,
    },
    titles: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '5%',
        marginTop: '8%',
        width: '100%',
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: "Bol",
        fontSize: 16,
        color: '#C0564B',
    },  
    titleNum: {
        fontFamily: "Bol",
        fontSize: 16,
        color: '#C0564B',
        marginLeft: '16%',
    },
    interieur: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: '85%',
        backgroundColor:'#FFC2B0' ,
        borderRadius: 30,
        padding: '2%'
    },  
    Bigtitle: {
        fontFamily: "Bol",
        fontSize: 22,
        color: '#C0564B',
        marginBottom: '5%',
    },
    namBox: {
        display: 'flex',
        flexDirection: 'row',
    },
});