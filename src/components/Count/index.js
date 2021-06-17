import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView, 
    Image,
    TextInput,
    Keyboard,
    Vibration
} from 'react-native';
import { Ionicons  } from '@expo/vector-icons';

import Modal from '../Modal';
import PlayBlack from '../PlayBlack';
import PlayWhite from '../PlayWhite';

export default function Count(){

    const [ chess, setChess ]             = useState(false);
    const [ count, setCount ]             = useState(false);
    const [ countBlack, setCountBlack ]   = useState(false);
    const [ value, setValue ]             = useState(0);
    const [ time, setTime ]               = useState(3 * 60);
    const [ timeBlack, setTimeBlack ]     = useState(3 * 60);
    const [ active, setActive ]           = useState(null);
    const [ modal, setModal ]             = useState(false);
    const minutes                         = Math.floor(time / 60);
    const seconds                         = time % 60;
    const minutesBlack                    = Math.floor(timeBlack / 60);
    const secondsBlack                    = timeBlack % 60;
    let countdown;


    function handleTime(){
        setTime(value * 60);
        setTimeBlack(value * 60);
        setValue(0);
        Keyboard.dismiss();
    }   

    function handleStop(){
        setChess(false);
        setCount(false);
        setCountBlack(false);
        setActive(null);
        setTime(null);
        setTimeBlack(null);
        clearTimeout(countdown);
    }   

    useEffect(() => {

        if(active == 1 && time > 0){
            countdown = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }

        if(time == 0){
            setModal(true);

            Vibration.vibrate();

            async function tempSound (){
                const { sound } = await Audio.Sound.createAsync(
                    require('../../assets/TempoBlack.mp3')
                );
                setSound(sound);
                await sound.playAsync();
            };

            tempSound();

            handleStop();
        }

    }, [ active, time,]);

    useEffect(() => {

        if(active == 0 && timeBlack > 0){
            countdown = setTimeout(() => {
                setTimeBlack(timeBlack - 1);
            }, 1000);
        }

        if(timeBlack == 0){
            setModal(true);

            Vibration.vibrate();

            async function tempSound (){
                const { sound } = await Audio.Sound.createAsync(
                    require('../../assets/TempoWhite.mp3')
                );
                setSound(sound);
                await sound.playAsync();
            };

            tempSound();

            handleStop();
        }

    }, [ active, timeBlack,]);

    return(
        <SafeAreaView style={ styles.container }>

            <PlayBlack setChess={ setChess } setCount={ setCount } setCountBlack={ setCountBlack } clearTimeout={ clearTimeout } setActive={ setActive } countdown={ countdown } />

            <View style={ styles.conteinerContent }>
                <View style={ styles.seila, { transform: [{ scaleY: -1 }, { scaleX: -1 }] } } >
                <View style={ countBlack ? styles.countBlackFalse : styles.countBlack } >
                    <Text style={ styles.countText } >{ minutes < 10 ? '0' + minutes : minutes }:{ seconds < 10 ? '0' + seconds : seconds }</Text>
                </View>
                </View>
                <View style={ styles.main } >

                    <View style={ chess ? styles.mainImageFalse : styles.mainImage } >
                        { 
                        chess ? 
                            <TouchableOpacity onPress={ handleStop } > 
                                <Ionicons name="md-stop-outline" size={50} color="white" /> 
                            </TouchableOpacity>
                        :                             
                            <Ionicons name="md-play-outline" size={50} color="white" />                              
                        }
                    </View>
                    
                    <View style={ styles.mainContent } >

                        <TextInput 
                            style={ styles.inputTemp } 
                            placeholder="Tempo"  
                            onChangeText={ text => setValue(text) }
                            value={ value }
                            keyboardType="numeric"
                        />

                        <TouchableOpacity onPress={ handleTime } style={ styles.countTemp } >
                            <Text style={ styles.countTempText } >OK</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={ count ? styles.countWhiteFalse : styles.countWhite } >
                    <Text style={ styles.countText } >{ minutesBlack < 10 ? '0' + minutesBlack : minutesBlack }:{ secondsBlack < 10 ? '0' + secondsBlack : secondsBlack }</Text>
                </View>

            </View>

            <PlayWhite setChess={ setChess } setCount={ setCount } setCountBlack={ setCountBlack } clearTimeout={ clearTimeout } countdown={ countdown } setActive={ setActive } />

            <Modal state={ modal } setState={ setModal } />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19191F',
      alignItems: 'center',
      justifyContent: 'space-between',
    },   

    conteinerContent: {
        width: '80%',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },    

    kingImage: {
        width: 20,
        height: 45
    },

    countBlack: {
        backgroundColor: '#1D217E',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        height: 70
    },

    countBlackFalse: {
        backgroundColor: '#EE1111',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        height: 70
    },

    main: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 70
    },

    mainImage: {
        backgroundColor: '#1D217E',
        paddingVertical: 15,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3
    },

    mainImageFalse: {
        backgroundColor: '#EE1111',
        paddingVertical: 15,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3
    },

    mainContent: {
        backgroundColor: '#FFF',
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputTemp: {
        paddingHorizontal: 10,
        fontSize: 20,
    },

    countTemp: {
        backgroundColor: '#1D217E',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    countTempText: {
        color: '#FFF',
        fontSize: 30,
    },

    countWhite: {
        backgroundColor: '#1D217E',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        height: 70
    },

    countWhiteFalse: {
        backgroundColor: '#EE1111',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        height: 70
    },

    countText: {
        color: '#FFF',
        fontSize: 36,
        letterSpacing: 10
    },    

});
  