import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import wingsboard from '../Northernconst/wingsboard';
import { man, manEagle, manHi, manGood, eagles } from '../Northernconst/wingsassts';
import { board } from '../Northernconst/wingsstyles';
import LinearGradient from 'react-native-linear-gradient';

const NorthernBRD = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const eagleFlyAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeAnim.setValue(0);
        slideAnim.setValue(50);
        scaleAnim.setValue(0.8);
        
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.elastic(1),
                useNativeDriver: true,
            })
        ]).start();

        if (currentStep === 2) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(eagleFlyAnim, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(eagleFlyAnim, {
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true,
                    })
                ])
            ).start();
        } else {
            eagleFlyAnim.setValue(0);
        }
    }, [currentStep]);

    const handleNext = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -50,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (currentStep < wingsboard.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                navigation.navigate('NorthernHM');
            }
        });
    };

    const eagleFly = eagleFlyAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15]
    });

    return (
        <View style={board.container}>
            <Animated.View 
                style={{
                    width: '100%',
                    alignItems: 'center',
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideAnim },
                        { scale: scaleAnim }
                    ]
                }}
            >
                {currentStep === 0 && (
                    <>
                        <Animated.Image 
                            source={manEagle} 
                            style={[
                                board.eagle, 
                                { 
                                    transform: [{ translateY: eagleFly }] 
                                }
                            ]} 
                        />
                        <Image source={manHi} style={board.manImg} />
                    </>
                )}

                {currentStep === 1 && (
                    <Image source={man} style={board.manImg} />
                )}

                {currentStep === 2 && (
                    <>
                        <Animated.Image 
                            source={eagles} 
                            style={[
                                board.eagles, 
                                { 
                                    transform: [{ translateY: eagleFly }] 
                                }
                            ]} 
                        />
                        <Image source={manGood} style={board.manImg} />
                    </>
                )}
            </Animated.View>

            <Animated.View 
                style={[
                    board.textContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { translateY: slideAnim },
                            { scale: scaleAnim }
                        ]
                    }
                ]}
            >
                <Text style={board.title}>{wingsboard[currentStep].title}</Text>
                <Text style={board.text}>{wingsboard[currentStep].text}</Text>

                <TouchableOpacity
                    onPress={handleNext}
                    style={board.button}
                    activeOpacity={0.7}
                >
                    <LinearGradient 
                        colors={['#FFFFFF', '#C69DFF']} 
                        style={board.gradient}
                        start={{x: 0, y: 0}} 
                        end={{x: 1, y: 0}}
                    >
                        <Text style={board.buttonText}>{wingsboard[currentStep].btn}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default NorthernBRD;