import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { backarr, logo } from '../Northernconst/wingsassts';
import { card, common } from '../Northernconst/wingsstyles';

const Northerninformation = () => {
    const navigation = useNavigation();
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const textSlide = useRef(new Animated.Value(20)).current;
    const backBtnRotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(backBtnRotate, {
            toValue: 1,
            duration: 800,
            easing: Easing.elastic(1),
            useNativeDriver: true
        }).start();

        Animated.sequence([
            Animated.timing(logoScale, {
                toValue: 1.1,
                duration: 600,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start();

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.timing(textSlide, {
                toValue: 0,
                duration: 1000,
                delay: 300,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const handleGoBack = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(slideUpAnim, {
                toValue: -30,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => navigation.goBack());
    };

    return (
        <View style={common.container}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={common.back}>
                <Image source={backarr} style={common.backIcon} />
            </TouchableOpacity>
            
            <Animated.View
                style={{
                    transform: [{
                        rotate: backBtnRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['-90deg', '0deg']
                        })
                    }]
                }}
            >
                <TouchableOpacity
                    onPress={handleGoBack}
                    style={common.back}
                >
                    <Image source={backarr} style={common.backIcon} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.Text 
                style={[
                    common.title, 
                    { 
                        alignSelf: 'center', 
                        fontSize: 22, 
                        marginBottom: 26,
                        opacity: fadeAnim,
                        transform: [{ translateY: slideUpAnim }]
                    }
                ]}
            >
                INFORMATION
            </Animated.Text>

            <Animated.Image 
                source={logo} 
                style={[
                    common.bigLogo,
                    { 
                        transform: [{ scale: logoScale }],
                        opacity: fadeAnim
                    }
                ]} 
            />

            <ScrollView style={{width: '100%'}}>
                <Animated.Text 
                    style={[
                        card.boldText, 
                        { 
                            marginBottom: 12, 
                            fontSize: 14,
                            opacity: fadeAnim,
                            transform: [{ translateY: textSlide }]
                        }
                    ]}
                >
                    NorthernWINGS is your personal travel guide to Canada. Discover unique places with accurate coordinates, detailed descriptions and photos. Save your favorite locations, create your own routes.
                </Animated.Text>
                
                <Animated.Text 
                    style={[
                        card.boldText, 
                        { 
                            fontSize: 14,
                            opacity: fadeAnim,
                            transform: [{ translateY: textSlide }]
                        }
                    ]}
                >
                    The application works as an offline guide, so you will always have access to information - even without the Internet. We do not collect your personal data: everything you add is stored only on your device.
                </Animated.Text>

                <View style={{height: 200}} />
            </ScrollView>
        </View>
    );
};

export default Northerninformation;