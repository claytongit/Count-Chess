import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function Modal(props){
    return(  
        <View style={ props.modal ? styles.containerModal : styles.modalHide }>
            <View style={ styles.modalContent }>
                <Image source={require('../../assets/imageModal.png')} />
                <Text style={ styles.modalText }>Tempo esgotado</Text>
                <TouchableOpacity style={ styles.modalBtn } onPress={ () => { props.setModal(false) } }>
                    <Text style={ styles.modalBtnText }>Ok</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        position: 'absolute',
        zIndex: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '90%',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHide: {
        display: 'none'
    },
    modalBtn: {
        width: '50%',
        backgroundColor: '#1D217E',
        padding: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    modalText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    }
});