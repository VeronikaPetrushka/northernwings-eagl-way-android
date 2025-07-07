import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readBtn, pinLocation } from '../Northernconst/wingsassts';
import { card, common } from '../Northernconst/wingsstyles';

const STORAGE_KEY = 'saved_places';

const NorthernSVD = () => {
    const navigation = useNavigation();
    const [savedPlaces, setSavedPlaces] = useState([]);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const cardAnimations = useRef([]).current;

    if (cardAnimations.length !== savedPlaces.length) {
        for (let i = 0; i < savedPlaces.length; i++) {
            cardAnimations[i] = {
                opacity: new Animated.Value(0),
                translateY: new Animated.Value(20),
                scale: new Animated.Value(0.95)
            };
        }
    }

    useEffect(() => {
        loadSavedPlaces();
    }, []);

    useFocusEffect(
        useCallback(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(slideUpAnim, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true
                })
            ]).start();

            loadSavedPlaces();
            return () => {
                fadeAnim.setValue(0);
                slideUpAnim.setValue(30);
            };
        }, [])
    );

    const loadSavedPlaces = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];
            setSavedPlaces(parsed);
            
            if (parsed.length > 0) {
                const animations = parsed.map((_, index) => {
                    if (!cardAnimations[index]) {
                        cardAnimations[index] = {
                            opacity: new Animated.Value(0),
                            translateY: new Animated.Value(20),
                            scale: new Animated.Value(0.95)
                        };
                    }
                    
                    return Animated.parallel([
                        Animated.timing(cardAnimations[index].opacity, {
                            toValue: 1,
                            duration: 500,
                            delay: index * 100,
                            useNativeDriver: true
                        }),
                        Animated.timing(cardAnimations[index].translateY, {
                            toValue: 0,
                            duration: 500,
                            delay: index * 100,
                            easing: Easing.out(Easing.quad),
                            useNativeDriver: true
                        }),
                        Animated.spring(cardAnimations[index].scale, {
                            toValue: 1,
                            friction: 4,
                            delay: index * 100,
                            useNativeDriver: true
                        })
                    ]);
                });
                
                Animated.stagger(100, animations).start();
            }
        } catch (err) {
            console.error('Error loading saved places:', err);
        }
    };

    const handleCardPress = (place, index) => {
        Animated.parallel([
            Animated.timing(cardAnimations[index].opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(cardAnimations[index].translateY, {
                toValue: -20,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => navigation.navigate('NorthernRP', { place }));
    };

    return (
        <View style={common.container}>
            <Animated.Text style={[
                common.title, 
                { 
                    alignSelf: 'center', 
                    fontSize: 22,
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUpAnim }]
                }
            ]}>
                SAVED PLACES
            </Animated.Text>

            {savedPlaces.length > 0 ? (
                <ScrollView style={{ width: '100%' }}>
                    {savedPlaces.map((place, idx) => (
                        <Animated.View
                            key={idx}
                            style={[
                                card.container,
                                {
                                    opacity: cardAnimations[idx]?.opacity || 0,
                                    transform: [
                                        { translateY: cardAnimations[idx]?.translateY || 0 },
                                        { scale: cardAnimations[idx]?.scale || 1 }
                                    ]
                                }
                            ]}
                        >
                            <Animated.Image 
                                source={place.image} 
                                style={[
                                    card.image,
                                    {
                                        opacity: cardAnimations[idx]?.opacity || 0,
                                        transform: [{ scale: cardAnimations[idx]?.scale || 1 }]
                                    }
                                ]} 
                            />
                            <View style={{width: '60%'}}>
                                <Text style={card.name}>{place.namer}</Text>
                                <View style={[common.row, {marginBottom: 11}]}>
                                    <Image source={pinLocation} style={card.pin} />
                                    <Text style={card.coordinates}>
                                        {place.coordinates[0]}, {place.coordinates[1]}
                                    </Text>
                                </View>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    style={card.description}
                                >
                                    {place.description}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => handleCardPress(place, idx)}
                                    activeOpacity={0.7}
                                >
                                    <Image 
                                        source={readBtn} 
                                        style={card.readBtn} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    ))}

                    <View style={{ height: 200 }} />
                </ScrollView>
            ) : (
                <Animated.View 
                    style={[
                        { padding: 20 },
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideUpAnim }]
                        }
                    ]}
                >
                    <Text style={common.noText}>No saved places</Text>
                </Animated.View>
            )}
        </View>
    );
};

export default NorthernSVD;