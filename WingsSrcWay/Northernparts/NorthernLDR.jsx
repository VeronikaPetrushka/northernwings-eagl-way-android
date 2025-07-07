import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import loaderHTML from '../Northernconst/wingsloader';
import { back } from '../Northernconst/wingsassts';

const NorthernLDR = () => {
    const navigation = useNavigation();

    const imageUri = Image.resolveAssetSource(back).uri;

    useEffect(() => {
        const timeout = setTimeout(() => {
        navigation.navigate('NorthernBRD');
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={{flex: 1}}>

            <WebView
                originWhitelist={['*']}
                source={{ html: loaderHTML(imageUri) }}
                style={{flex: 1}}
            />

        </View>
    );
};

export default NorthernLDR;