import {FlatList, StyleSheet, Text, View} from 'react-native';

const Allitem = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Text style={styles.text}>Items</Text>
        <Text style={styles.text}>Quantitiy</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 10}}
        renderItem={({item}) => (
          <View
            style={[
              styles.mapedData,

              {backgroundColor: item.quantity < 8 ? 'tomato' : '#086166'},
            ]}>
            <Text style={styles.maptext}>{item.name}</Text>
            <Text style={styles.maptext}>{item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Allitem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  maptext: {
    fontSize: 18,
    fontWeight: 500,
    color: 'white',
  },
  mapedData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:10
  },
});
