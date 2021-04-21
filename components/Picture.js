import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { max } from 'react-native-reanimated';

function Picture(props) {
    

    return (
        <View>
            <Image
                style={styles.pic}
                source={{uri: props.uri}}
            /> 
        </View>
    );

    
}

const styles = StyleSheet.create({
    pic: {
        width: 140,
        height: 140,
    }
});

export default Picture;