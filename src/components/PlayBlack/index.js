import React, { useState } from 'react';
import { StyleSheet,  TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayBlack(props){

    const [ sound, setSound ] = useState();

    async function handleBlack(){
        props.setChess(true);

        props.setCount(true);
        props.setCountBlack(false);
    
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/click1.mp3')
        );
        setSound(sound);
        await sound.playAsync();

        props.clearTimeout(props.countdown);

        props.setActive(0);
    }

    return(
        <TouchableOpacity onPress={ handleBlack } style={ styles.containerBlack }>
            <Image source={ require('../../assets/toque.png') } />
            <Image style={ styles.kingImageBlack, { transform: [{ scaleY: -1 }] } }  source={ require('../../assets/kingBlack.png') } />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerBlack: {
        backgroundColor: '#FFF',
        height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});