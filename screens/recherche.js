import React,{useEffect,useState} from"react";
import { StyleSheet, Text, View ,TouchableOpacity ,ScrollView} from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import wilaya from '../api/wilaya.json';
import daira from '../api/commune.json';
import firebase from '../firebase';
import NotifRecherche from "./notifRecherche";

import { useTranslation } from 'react-i18next';

export default function Recherche({ navigation}) {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedWilayaId, setSelectedWilayaId] = useState('');
    const [dairasOptions, setDairasOptions] = useState([]);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    // les informations de la recherche
    const [blood, setBlood] = useState('');
    const [rh, setRh] = useState('');
    const [selectedWilayaName, setSelectedWilayaName] = useState('');
    const [selectedDaira, setSelectedDaira] = useState('');

    //gestion des erreurs de validation
    const [validationErrorMessage, setValidationErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ selectListErrorMessage, setSelectListErrorMessage] = useState('');

    const { t } = useTranslation();

    const type = [
        {key:'1', value:'A'},
        {key:'2', value:'B'},
        {key:'3', value:'AB'},
        {key:'4', value:'O'},,
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
    
    const searchForDonors = async (bloodType,rhesus,wilaya,daira) => {
        try {
          // Reference to the Firestore collection where donors are stored
          const donorsCollectionRef = firebase.firestore().collection('informations donneurs');
    
          // Query to retrieve donors with the specified blood type and wilaya
          const querySnapshot = await donorsCollectionRef
            .where('blood', '==', bloodType)
            .where('rh', '==', rhesus)
            .where('selectedWilayaName', '==', wilaya)
            .where('selectedDaira', '==', daira)
            .limit(10) 
            .get();
    
          // Process the query results and store them in a variable
          const donors = [];
          querySnapshot.forEach((doc) => {
            // Assuming your Firestore documents have fields like 'name' and 'phoneNumber'
            const donorData = doc.data();
            donors.push(donorData);
          });
    
          // Now you have the list of donors that match the search criteria
          setSearchResults(donors); // Update the state with search results
          return donors; // Return the search results from this function
        } catch (error) {
          console.error('Error searching for donors:', error);
        }
    };

    const handleSearchButtonClick = async () => {
        const bloodType = blood
        const rhesus = rh
        const wilaya = selectedWilayaName
        const daira = selectedDaira

        let hasErrors = false;
        if (!bloodType || !rhesus || !wilaya || !daira) {
            setSelectListErrorMessage('Veuillez choisir une option avant de continuer.');
            hasErrors = true;
        }
        if (hasErrors) {
            return;
        }

        try {
            // Call the searchForDonors function
            const results = await searchForDonors(bloodType, rhesus, wilaya, daira);
        
            if (results && results.length > 0) {
              // Results found, navigate to the Result Screen and pass the search results as params
              navigation.navigate('Besoin', { searchResult: results });
            } else {
              // Handle case when no matching donors are found
              setSuccessModalVisible(true);
            }
          } catch (error) {
            console.error('Error searching for donors:', error);
          }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>{t('rechercheTitre')}</Text>
                
            </View>
            <View style={styles.body}   >
                <ScrollView style={styles.interieur}>
                {/* blood type menu */}
                <View style={styles.bloodType}>
                <Text style={styles.BigTitle}>{t('bigTitle')}</Text>
                    <Text style={styles.title}>{t('typeSang')}</Text>
                    <SelectList 
                        placeholder={t('groupe')}
                        setSelected={(val) =>{ setBlood(val);setSelectListErrorMessage('')}} 
                        data={type}
                        save="value"
                        maxHeight={100}
                        inputStyles={{color:'#402E32',fontSize:16}}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignItems:'center',marginBottom:15,backgroundColor:'white',borderColor: '#ccc',height:60}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                    <SelectList 
                        placeholder={t('rh')}
                        setSelected={(val) => {setRh(val);setSelectListErrorMessage('')}} 
                        data={typeRh}
                        save="value"
                        fontFamily="Reg"
                        inputStyles={{color:'#402E32',fontSize:16}}
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',marginBottom:15,backgroundColor:'white',borderColor: '#ccc',alignItems:'center',height:60,}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />

                {/* adresse */}
                <Text style={styles.title}>{t('donnerAdresse')}</Text>
                    <SelectList 
                        placeholder={t('wilaya')}
                        setSelected={handleWilayaSelection}
                        data={wilaya.map(item => ({ value: item.name, label: item.id }))}
                        save="value"
                        maxHeight={100}
                        inputStyles={{color:'#402E32',fontSize:16}}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',marginBottom:15,backgroundColor:'white',borderColor: '#ccc',alignItems:'center',height:60,}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />

                    <SelectList 
                        placeholder={t('daira')}
                        setSelected={(val) => {setSelectedDaira(val),setSelectListErrorMessage('')}} 
                        data={dairasOptions}
                        save="value"
                        maxHeight={100}
                        inputStyles={{color:'#402E32',fontSize:16}}
                        fontFamily="Reg"
                        boxStyles={{borderRadius:8,width:'100%',alignSelf:'center',backgroundColor:'white',borderColor: '#ccc',alignItems:'center',height:60,}}
                        dropdownStyles={{width:'100%',marginBottom:10,backgroundColor:'white',borderColor: '#ccc',}}
                    />
                </View>
                <TouchableOpacity style={styles.bouton}  onPress={handleSearchButtonClick}>
                    <Text style={styles.boutonText}>{t('rechercheButton')}</Text>
                </TouchableOpacity>
                <NotifRecherche visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} />
                {selectListErrorMessage ? (
                    <Text style={styles.errorText}>{selectListErrorMessage}</Text>
                ) : null}
                </ScrollView>   
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
        fontSize: 26,
        alignSelf: 'center',
        marginTop: '9%',
    },
    boutonText: {
        fontFamily: "Bol",
        color: 'white',
        fontSize: 20,   
    },
    bouton: {
        width: '80%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0362F',
        borderRadius: 14,
        margin:'4%',
        marginTop:15,
        alignSelf: 'center',
        elevation: 8,
        shadowColor: '#52006A',
    },
    body: {
        flex: 1,
        width: '100%',
        backgroundColor:'#FFF3DE',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingTop: '10%',
    },
    bloodType: {
        width: '100%',
        padding: '5%',
        paddingTop: 0,        
    },
    title: {
        fontFamily: "Bol",
        fontSize: 19,
        marginBottom: 12,
        color: '#C0564B',
    },
    BigTitle: {
        fontFamily: "Bol",
        fontSize: 22,
        marginBottom: '15%',
        color: '#C0564B',
        alignSelf: 'center',
    },
    header: {
        alignSelf: 'center',
        width: '100%',
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    interieur: {
        width: '100%',
        marginTop: '5%',
    },
    errorText: {
        fontFamily: "Reg",
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom:10,
    },
});