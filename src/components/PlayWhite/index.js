import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function PlayWhite(props){

    const [ sound, setSound ] = useState();

    async function handleWhite(){
        props.setChess(true);

        props.setCount(false);
        props.setCountBlack(true);

        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/click1.mp3')
        );
        setSound(sound);
        await sound.playAsync();

        props.clearTimeout(props.countdown);

        props.setActive(1);
    }

    return(
        <TouchableOpacity onPress={ handleWhite } style={ styles.containerWhite } >
            <Image style={ styles.kingImage }  source={ require('../../assets/kingWhite.png') } />
            <Image source={ require('../../assets/toque.png') } />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerWhite: {
        backgroundColor: '#FFF',
        height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});