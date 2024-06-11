import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View ,ScrollView,TouchableOpacity, TextInput} from 'react-native';
import Checkbox from "expo-checkbox";
import { SelectList } from "react-native-dropdown-select-list";
import wilaya from '../api/wilaya.json';
import daira from '../api/commune.json';
import firebase from "../firebase";
import Notif from "./notif";

import { useTranslation } from 'react-i18next';

export default function Donner() {
    const [blood, setBlood] = useState('');
    const [rh, setRh] = useState('');
    const [selectedWilayaName, setSelectedWilayaName] = useState('');
    const [selectedWilayaId, setSelectedWilayaId] = useState('');
    const [selectedDaira, setSelectedDaira] = useState('');
    const [dairasOptions, setDairasOptions] = useState([]);
    const [age, setAge] = useState('');

    const [validationErrorMessage, setValidationErrorMessage] = useState('');
    const [numberError, setNumberError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ selectListErrorMessage, setSelectListErrorMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [num, setNum] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const phoneNumberRegex = /^\d{10}$/;
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const { t } = useTranslation();

    const handleAnonymousCheckbox = () => {
        setIsAnonymous((prevIsAnonymous) => !prevIsAnonymous);
      };

    const type = [
        {key:'1', value:'A'},
        {key:'2', value:'B'},
        {key:'3', value:'AB'},
        {key:'4', value:'O'},,
    ]

    const typeAge = [
        {key:'1', value:'18'},
        {key:'2', value:'19'},
        {key:'3', value:'20'},
        {key:'4', value:'21'},
        {key:'5', value:'22'},
        {key:'6', value:'23'},
        {key:'7', value:'24'},
        {key:'8', value:'25'},
        {key:'9', value:'26'},
        {key:'10', value:'27'},
        {key:'11', value:'28'},
        {key:'12', value:'29'},
        {key:'13', value:'30'},
        {key:'14', value:'31'},
        {key:'15', value:'32'},
        {key:'16', value:'33'},
        {key:'17', value:'34'},
        {key:'18', value:'35'},
        {key:'19', value:'36'},
        {key:'20', value:'37'},
        {key:'21', value:'38'},
        {key:'22', value:'39'},
        {key:'23', value:'40'},
        {key:'24', value:'41'},
        {key:'25', value:'42'},
        {key:'26', value:'43'},
        {key:'27', value:'44'},
        {key:'28', value:'45'},
        {key:'29', value:'46'},
        {key:'30', value:'47'},
        {key:'31', value:'48'},
        {key:'32', value:'49'},
        {key:'33', value:'50'},
        {key:'34', value:'51'},
        {key:'35', value:'52'},
        {key:'36', value:'53'},
        {key:'37', value:'54'},
        {key:'38', value:'55'},
        {key:'39', value:'56'},
        {key:'40', value:'57'},
        {key:'41', value:'58'},
        {key:'42', value:'59'},
        {key:'43', value:'60'},
    ]
    const typeRh = [
        {key:'1', value:'+'},
        {key:'2', value:'-'},
    ]
    const handleWilayaSelection = (selectedWilayaName) => {
        const selectedWilaya = wilaya.find(item => item.name === selectedWilayaName);
        if (selectedWilaya) {
          setSelectedWilayaId(selectedWilaya.id);
          setSelectedWilayaName(selectedWilaya.name);
          setSelectedDaira('');
        }
    };
      
      useEffect(() => {
        // Filter the dairas based on the selected wilaya
        const filteredDairas = daira
          .filter(item => item.wilaya_id === selectedWilayaId)
          .map(item => ({ value: item.name, label: item.id }));
        setDairasOptions(filteredDairas);
      }, [selectedWilayaId]);

      const handleBloodInformation = () => {
        let hasErrors = false;
        if (!phoneNumberRegex.test(num)) {
            setNumberError('Veuillez saisir un numéro de téléphone valide');
            hasErrors = true;
        }

        if(!isAnonymous){
            if (!nom.trim() || !prenom.trim() || !num.trim()) {
                setValidationErrorMessage('veuillez remplir tout les champs avant de valider');
                hasErrors = true;
            }
        }
        
        if (!selectedDaira || !selectedWilayaName || !blood || !rh) {
            setSelectListErrorMessage('Veuillez choisir une option.');
            hasErrors = true;
        }
        if (hasErrors) {
            return;
        }
        // Create an object with the blood information
            const don = {
                num,
                age,
                blood,
                rh,
                selectedWilayaName,
                selectedDaira,
            };
              // If the anonymous checkbox is checked, set "anonyme" for "nom" and "prenom"
            if (isAnonymous) {
                don.nom = 'anonyme';
            } else {
                // If the anonymous checkbox is unchecked, set the provided values for "nom" and "prenom"
                don.nom = nom;
                don.prenom = prenom;
              }

            //mettre l'objet créé dans la base de données (firebase)
            firebase.firestore().collection('informations donneurs').add(don).then(() => {
                console.log('donneur ajouté');
                setSuccessModalVisible(true);
                setNom('');
                setPrenom('')
                setNum('')
            }).catch((error) => {
                console.log('erreur lors de lajout',error);
                setErrorMessage("Une erreur est parvenu lors de l'ajout du donneur");
            });
    };

    return (
        <View style={styles.container}>
            {/* header view */}
            <View style={styles.header}>
                <Text style={styles.textHeader}>{t('donnerTitre')}</Text>
            </View>   

            {/* body view */}
            <View style={styles.body}>
                <ScrollView style={styles.interieur}>
                {/* nom prenom et tout */}
                <View style={styles.information}>
                    <Text style={styles.title}>{t('donnerInfo')}</Text>
                    <View style={styles.annonceContainer}>
                        <Text style={styles.annonce} >{t('annonce')}</Text>
                        <Text style={styles.annonceText} >{t('annonceM')}</Text>
                    </View>

                    <TextInput style={styles.input} placeholder={t('donnerNom')} autoCapitalize="none" onChangeText={(text) => {setNom(text); setValidationErrorMessage('');}} value={nom}/>

                    <TextInput style={styles.input} placeholder={t('donnerPrenom')} value={prenom} onChangeText={(text) => {setPrenom(text); setValidationErrorMessage('');}}/>
                    
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkText}>{t('donnerAnonyme')}</Text>
                        <Checkbox style={styles.checkbox} 
                            value={isAnonymous} 
                            onValueChange={handleAnonymousCheckbox} 
                            color={isAnonymous ? '#C0564B' : undefined} />
                    </View>
                </View>
                {/* age  */}
                <View style={styles.information}>
                    <Text style={styles.title}>{t('donnerAge')}</Text>
                    <SelectList 
                        placeholder={t('age')}
                        setSelected={(val) =>{ setAge(val) ;setSelectListErrorMessage('')}} 
                        data={typeAge}
                        save="value"
                        maxHeight={100}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                </View>

                {/* blood type menu */}
                <View style={styles.bloodType}>
                    <Text style={styles.title}>{t('typeSang')}</Text>
                    <SelectList 
                        placeholder={t('groupe')}
                        setSelected={(val) =>{ setBlood(val) ;setSelectListErrorMessage('')}} 
                        data={type}
                        save="value"
                        maxHeight={100}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                    <SelectList 
                        placeholder={t('rh')}
                        setSelected={(val) => {setRh(val);setSelectListErrorMessage('');}} 
                        data={typeRh}
                        save="value"
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',backgroundColor:'white',borderColor: '#ccc',}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                </View>

                {/* adresse */}
                <View style={styles.adresse}>
                    <Text style={styles.title}>{t('donnerAdresse')}</Text>
                    <SelectList 
                        placeholder={t('wilaya')}
                        setSelected={handleWilayaSelection}
                        data={wilaya.map(item => ({ value: item.name, label: item.id }))}
                        save="value"
                        maxHeight={100}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />

                    <SelectList 
                        placeholder={t('daira')}
                        setSelected={(val) => {setSelectedDaira(val);setSelectListErrorMessage('')}} 
                        data={dairasOptions}
                        save="value"
                        maxHeight={100}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',backgroundColor:'white',borderColor: '#ccc',}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                    {selectListErrorMessage ? (
                    <Text style={styles.errorText}>{selectListErrorMessage}</Text>
                ) : null}
                
                </View>

                <View style={styles.num}>
                    <Text style={styles.title}>{t('donnerNum')}</Text>
                    <TextInput style={styles.input} placeholder={t('num')} keyboardType="numeric" onChangeText={(text) => {setNum(text); setValidationErrorMessage('');setNumberError('')}} value={num}/>
                    {numberError ? (
                    <Text style={styles.errorText}>{numberError}</Text>
                ) : null}
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.bouton} onPress={handleBloodInformation}>
                        <Text style={styles.boutonText}>{t('donnerButton')}</Text>
                    </TouchableOpacity>
                    <Notif visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} />
                </View>
                {validationErrorMessage ? (
                    <Text style={styles.errorText}>{validationErrorMessage}</Text>
                ) : null}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#D0362F',
    },
    textHeader: {
        fontFamily: "Bol",
        color: '#FFF3DE',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: '5.5%',
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
    information: {
        width: '100%',
        padding: '5%',
        paddingBottom: 0,
        paddingTop: 0,
    },
    num: {
        width: '100%',
        padding: '5%',
    },
    input: {
        height: 48,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        fontFamily: "Reg",
        backgroundColor: 'white',
        borderRadius: 8,
        paddingLeft: 9,
        paddingRight: 9,
        fontSize: 15,
        marginBottom: 10,
    },
    title: {
        fontFamily: "Bol",
        fontSize: 17,
        marginBottom: 12,
        color:'#D0362F',
    },
    checkboxContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    checkText: {
        fontFamily: "Reg",
        marginRight:5,
        fontSize: 15,
        color:'#C0564B',
    },
    button: {
        width: '100%',
    },
    boutonText: {
        fontFamily: "Bol",
        color: 'white',
        fontSize: 18,   
    },
    bouton: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0362F',
        borderRadius: 14,
        margin:'4%',
        marginTop:0,
        alignSelf: 'center',
        elevation: 8,
        shadowColor: '#52006A',
    },
    adresse: {
        width: '100%',
        padding: '5%',
        paddingBottom: 0,
        paddingTop: 0,
    },
    bloodType: {
        width: '100%',
        padding: '5%',
        paddingTop: 0,
    },
    header: {
        alignSelf: 'center',
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    interieur: {
        width: '100%',
        marginTop: '6%',
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
    },
    errorText: {
        fontFamily: "Reg",
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom:'3%',
    },
    checkbox: {
        marginBottom: '0.5%',
        borderColor: '#ccc',
    },
    annonceContainer: {
        borderColor: '#C0564B',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        padding: 5,
        width: '90%',
        alignSelf: 'center',
    },
    annonce: {
        fontFamily: "Bol",
        color: '#C0564B',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom:'2%',
    },
    annonceText: {
        fontFamily: "Reg",
        color: '#C0564B',
        fontSize: 10,
        alignSelf: 'center',
    }
});