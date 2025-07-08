import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Share, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { backarr, openMapBtn, pinLocation, saveBtn, savedBtn, shareSmall } from '../Northernconst/wingsassts';
import { card, common } from '../Northernconst/wingsstyles';

const NorthernRP = ({ place }) => {
    const navigation = useNavigation();
    const [openMap, setOpenMap] = useState(false);
    const [isPlaceSaved, setIsPlaceSaved] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const backBtnRotate = useRef(new Animated.Value(0)).current;
    const saveBtnPulse = useRef(new Animated.Value(1)).current;
    const mapToggleAnim = useRef(new Animated.Value(0)).current;

    const STORAGE_KEY = 'saved_places';

    useEffect(() => {
        checkIfPlaceIsSaved();
        startAnimations();
    }, []);

    const startAnimations = () => {
        Animated.spring(backBtnRotate, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true
        }).start();

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start();
    };

    const animateMapToggle = () => {
        Animated.sequence([
            Animated.timing(mapToggleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(mapToggleAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => setOpenMap(!openMap));
    };

    const animateSaveButton = () => {
        Animated.sequence([
            Animated.timing(saveBtnPulse, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.timing(saveBtnPulse, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true
            })
        ]).start();
    };

    const checkIfPlaceIsSaved = async () => {
        try {
            const savedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedPlaces) {
                const parsedPlaces = JSON.parse(savedPlaces);
                const isSaved = parsedPlaces.some(savedPlace => savedPlace.namer === place.namer);
                setIsPlaceSaved(isSaved);
            }
        } catch (error) {
            console.error('Error checking saved places:', error);
        }
    };

    const toggleSavePlace = async () => {
        animateSaveButton();
        try {
            const savedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
            let places = savedPlaces ? JSON.parse(savedPlaces) : [];

            if (isPlaceSaved) {
                places = places.filter(savedPlace => savedPlace.namer !== place.namer);
            } else {
                const alreadyExists = places.some(savedPlace => savedPlace.namer === place.namer);
                if (!alreadyExists) {
                    places.push(place);
                }
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places));
            setIsPlaceSaved(!isPlaceSaved);
        } catch (error) {
            console.error('Error toggling saved place:', error);
        }
    };

    const sharePlace = async () => {
        try {
            await Share.share({
                message: `Check out this place: ${place.namer}\nCoordinates: ${place.coordinates[0]}, ${place.coordinates[1]}\nDescription: ${place.description}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const mapToggleInterpolation = mapToggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const mapDarkStyle = [
        { elementType: 'geometry', stylers: [{ color: '#212121' }] },
        { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
        { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
        { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
        { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
        { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
        { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] },
        { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
        { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] }
    ];

    return (
        <View style={common.container}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={common.back}>
                <Image source={backarr} style={common.backIcon} />
            </TouchableOpacity>
            
            <Animated.View style={{
                transform: [{
                    rotate: backBtnRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-90deg', '0deg']
                    })
                }]
            }}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={common.back}
                >
                    <Image source={backarr} style={common.backIcon} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.Text style={[
                common.title, 
                { 
                    alignSelf: 'center', 
                    fontSize: 22, 
                    marginBottom: 26,
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}>
                {openMap ? `${place.namer} (map)` : `${place.namer}`}
            </Animated.Text>

            {openMap ? (
                <Animated.View style={{
                    width: '100%', 
                    height: '70%', 
                    borderRadius: 22, 
                    overflow: 'hidden',
                    opacity: fadeAnim,
                    transform: [
                        { rotateY: mapToggleInterpolation },
                        { scale: scaleAnim }
                    ]
                }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        region={{
                            latitude: place.coordinates[0],
                            longitude: place.coordinates[1],
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                        customMapStyle={mapDarkStyle}
                    >
                        <Marker coordinate={{
                            latitude: place.coordinates[0],
                            longitude: place.coordinates[1]
                        }} />
                    </MapView>
                </Animated.View>
            ) : (
                <Animated.ScrollView style={{
                    width: '100%',
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideAnim },
                        { scale: scaleAnim }
                    ]
                }}>
                    <Animated.View style={[
                        card.container, 
                        { 
                            flexDirection: 'column',
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}>
                        <Animated.Image 
                            source={place.image} 
                            style={[
                                card.image, 
                                { 
                                    width: '100%', 
                                    marginBottom: 20,
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }]
                                }
                            ]} 
                        />

                        <Animated.View style={[
                            common.row, 
                            { 
                                marginBottom: 20,
                                opacity: fadeAnim,
                                transform: [{ translateX: slideAnim }]
                            }
                        ]}>
                            <Image source={pinLocation} style={[card.pin, {width: 26, height: 26}]} />
                            <Text style={[card.coordinates, {fontSize: 13}]}>
                                {place.coordinates[0]}, {place.coordinates[1]}
                            </Text>
                        </Animated.View>

                        <Animated.Text style={[
                            card.name,
                            { 
                                opacity: fadeAnim,
                                transform: [{ translateX: slideAnim }]
                            }
                        ]}>
                            DESCRIPTION
                        </Animated.Text>
                        
                        <Animated.Text style={[
                            card.description, 
                            { 
                                fontSize: 13, 
                                marginBottom: 30,
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}>
                            {place.description}
                        </Animated.Text>

                        <Animated.View style={[
                            common.row, 
                            { 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                width: '100%',
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}>
                            <TouchableOpacity
                                onPress={animateMapToggle}
                                style={{width: '48%'}}
                            >
                                <Image 
                                    source={openMapBtn} 
                                    style={{
                                        width: '100%', 
                                        height: 64, 
                                        resizeMode: 'contain'
                                    }} 
                                />
                            </TouchableOpacity>
                            
                            <View style={{width: '48%', flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={sharePlace}
                                    style={{width: '49%'}}
                                >
                                    <Image
                                        source={shareSmall}
                                        style={{ 
                                            width: '100%', 
                                            height: 64, 
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    onPress={toggleSavePlace}
                                    style={{width: '49%'}}
                                >
                                    <Animated.Image
                                        source={isPlaceSaved ? savedBtn : saveBtn}
                                        style={{ 
                                            width: '100%', 
                                            height: 64, 
                                            resizeMode: 'contain',
                                            transform: [{ scale: saveBtnPulse }]
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </Animated.View>
                    
                    <View style={{height: 100}} />
                </Animated.ScrollView>
            )}
        </View>
    );
};

export default NorthernRP;