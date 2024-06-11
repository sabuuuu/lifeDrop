import React, { useState } from 'react';
import { View, Text, FlatList, LayoutAnimation, TouchableOpacity, UIManager, Platform ,StyleSheet} from 'react-native';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UsefulInfo = ({ data }) => {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleSection = (id) => {
    const isExpanded = expandedIds.includes(id);

    // Use LayoutAnimation to create a smooth animation effect
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (isExpanded) {
      // Collapse the section
      setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
    } else {
      // Expand the section
      setExpandedIds([...expandedIds, id]);
    }
  };

  const renderSection = ({ item }) => {
    const isExpanded = expandedIds.includes(item.id);

    return (
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection(item.id)}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
        </TouchableOpacity>
        {isExpanded && <Text style={styles.sectionContent}>{item.content}</Text>}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderSection}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: '#FFC2B0',
    borderRadius: 10,
    margin: '2%',
    padding: '2%',
    width: '95%',
  },
  sectionTitle: {
    fontFamily: 'Bol',
    fontSize: 16,
    color: '#402E32',
  },
  sectionContent: {
    marginTop: 5,
    color:'#402E32',
    fontFamily: 'Reg',
    fontSize: 14,
  },
});

export default UsefulInfo;