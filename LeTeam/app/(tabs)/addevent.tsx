import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../firebaseConfig'
import { ref,set } from 'firebase/database'



const AddData = () => {
    const [event, setEvent] = useState('')
    const [eventinfo, setEventInfo] =  useState('') 

    //funtion that adds to database
    const dataAddOn = () => {
        set(ref(db, 'posts/' + event), {
            event: event,
            eventinfo: eventinfo,
        });
        setEvent('')
        setEventInfo('')
    }
    return (
        <View style={styles.container}>
        <Text style={styles.header}> addData function</Text>
        <TextInput 
            placeholder='Event Name'
            value={event}
            onChangeText={(text) => setEvent(text)}
            style={styles.input}
        />
        <TextInput 
            placeholder='Event Info'
            value={eventinfo}
            onChangeText={(text) => setEventInfo(text)}
            style={styles.input}
        />
        <Button
        title='Add Event'
        onPress={dataAddOn} />
        </View>
    )
}


export default AddData
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    header:{
        fontSize:30,
        textAlign:'center',
        marginTop:100,
        fontWeight:'bold'
    },
    input:{
        borderWidth:1,
        borderColor:'black',
        borderRadius:5,
        margin:10,
        padding:10,
        fontSize:18
    }
  });
  