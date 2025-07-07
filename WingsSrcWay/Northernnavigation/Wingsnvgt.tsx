import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useNorthernWingsNavigationTracker from './Wingsnvgahandler';
import { RootStackParamList } from '../Northernconst/types.js';
import wingsnvgt from './wingsnvgt.js';
import { nvgt } from '../Northernconst/wingsstyles.js';

type WingItem = {
  wing: keyof RootStackParamList;
  img: any;
};

const Wingsnvgt: React.FC = () => {
    const { activeRoute, navigateTo } = useNorthernWingsNavigationTracker();

    return (
        <View style={nvgt.container}>
            {
                (Array.isArray(wingsnvgt) ? wingsnvgt : []).map((wing: WingItem, idx: number) => (
                <TouchableOpacity
                    key={idx}
                    style={nvgt.button}
                    onPress={() => navigateTo(wing.wing)}
                >
                    {activeRoute === wing.wing && (
                        <LinearGradient
                            colors={['#FFFFFF', '#C69DFF']}
                            style={nvgt.gradient}
                        />
                    )}
                        <Image
                            source={wing.img}
                            resizeMode="contain"
                            style={nvgt.image}
                        />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Wingsnvgt;
