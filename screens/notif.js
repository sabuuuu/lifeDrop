import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

const Notif = ({ visible, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.successText}>{t('success')}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('fermer')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFF3DE',
      padding: 20,
      borderRadius: 10,
    },
    successText: {
        color: '#C0564B' ,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'Bol',
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    closeButtonText: {
      color: '#FFA2B0',
      fontSize: 16,
      fontFamily: 'Reg',
    },
  });
  
export default Notif;

  
  
  