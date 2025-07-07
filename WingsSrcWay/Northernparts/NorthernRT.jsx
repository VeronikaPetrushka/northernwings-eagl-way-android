import React, { useState, useCallback, useRef } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Share, Alert, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addBtn, calendar, deleteBtn, movement, openBtn, shareBtn, wherearr } from '../Northernconst/wingsassts';
import { card, common, route } from '../Northernconst/wingsstyles';

const ROUTES_KEY = 'northern_routes';

const NorthernRT = () => {
    const navigation = useNavigation();
    const [newRoutes, setNewRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [openSelectedRoute, setOpenSelectedRoute] = useState(false);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const addBtnScale = useRef(new Animated.Value(1)).current;
    const routeAnimations = useRef([]).current;

    useFocusEffect(
        useCallback(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.timing(slideUpAnim, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true
                })
            ]).start();

            loadRoutes();
            
            return () => {
                fadeAnim.setValue(0);
                slideUpAnim.setValue(30);
            };
        }, [])
    );

    const loadRoutes = async () => {
        try {
            const stored = await AsyncStorage.getItem(ROUTES_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            setNewRoutes(parsed);
            
            parsed.forEach((_, index) => {
                if (!routeAnimations[index]) {
                    routeAnimations[index] = {
                        opacity: new Animated.Value(0),
                        translateY: new Animated.Value(20),
                        height: new Animated.Value(0),
                        expanded: new Animated.Value(0)
                    };
                }
            });
            
            if (parsed.length > 0) {
                const animations = parsed.map((_, index) => {
                    return Animated.parallel([
                        Animated.timing(routeAnimations[index].opacity, {
                            toValue: 1,
                            duration: 500,
                            delay: index * 100,
                            useNativeDriver: true
                        }),
                        Animated.timing(routeAnimations[index].translateY, {
                            toValue: 0,
                            duration: 500,
                            delay: index * 100,
                            easing: Easing.out(Easing.quad),
                            useNativeDriver: true
                        })
                    ]);
                });
                
                Animated.stagger(100, animations).start();
            }
        } catch (err) {
            console.error('Failed to load routes:', err);
        }
    };

    const animateAddButton = () => {
        Animated.sequence([
            Animated.timing(addBtnScale, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.spring(addBtnScale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true
            })
        ]).start(() => navigation.navigate('NorthernADDRT'));
    };

    const toggleSelectedRoute = (id, index) => {
        if (selectedRoute === id) {
            Animated.timing(routeAnimations[index].expanded, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start(() => {
                setOpenSelectedRoute(false);
                setSelectedRoute(null);
            });
        } else {
            setSelectedRoute(id);
            setOpenSelectedRoute(true);
            Animated.timing(routeAnimations[index].expanded, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    };

    const handleShare = async (route) => {
        try {
            await Share.share({
                message: `📍 Planned Route:\n\nFrom: ${route.move}\nTo: ${route.where}\n\n🗓 Date: ${route.date}\n⏰ Time: ${route.dateTime}`,
            });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleDelete = (id, index) => {
        Alert.alert(
            'Delete Route',
            'Are you sure you want to delete this route?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            Animated.parallel([
                                Animated.timing(routeAnimations[index].opacity, {
                                    toValue: 0,
                                    duration: 300,
                                    useNativeDriver: true
                                }),
                                Animated.timing(routeAnimations[index].translateY, {
                                    toValue: -20,
                                    duration: 300,
                                    useNativeDriver: true
                                })
                            ]).start(async () => {
                                const updatedRoutes = newRoutes.filter(r => r.id !== id);
                                await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(updatedRoutes));
                                setNewRoutes(updatedRoutes);
                                if (selectedRoute === id) setSelectedRoute(null);
                            });
                        } catch (err) {
                            console.error('Failed to delete route:', err);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={common.container}>
            <Animated.View style={[
                common.row, 
                { 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 42, 
                    width: '100%',
                    opacity: fadeAnim,
                    transform: [{ translateY: slideUpAnim }]
                }
            ]}>
                <Animated.Text style={[
                    common.title, 
                    { 
                        fontSize: 22, 
                        marginBottom: 0,
                        opacity: fadeAnim,
                        transform: [{ translateX: slideUpAnim.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, -10]
                        }) }]
                    }
                ]}>
                    ROUTES
                </Animated.Text>

                <Animated.View style={{ transform: [{ scale: addBtnScale }] }}>
                    <TouchableOpacity 
                        onPress={animateAddButton}
                        activeOpacity={0.7}
                    >
                        <Image source={addBtn} style={route.addButton} />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {newRoutes.length > 0 ? (
                <ScrollView style={{width: '100%'}}>
                    <Animated.Text style={[
                        common.title,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideUpAnim }]
                        }
                    ]}>
                        My routes
                    </Animated.Text>

                    {newRoutes.map((route, idx) => (
                        <Animated.View
                            key={idx}
                            style={[
                                {width: '100%', marginBottom: 7},
                                {
                                    opacity: routeAnimations[idx]?.opacity || 0,
                                    transform: [
                                        { translateY: routeAnimations[idx]?.translateY || 0 }
                                    ]
                                }
                            ]}
                        >
                            <Animated.View 
                                style={[
                                    card.container, 
                                    { 
                                        flexDirection: 'column',
                                        height: routeAnimations[idx]?.expanded.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [120, 280]
                                        })
                                    }
                                ]}
                            >
                                {(openSelectedRoute && selectedRoute === route.id) ? (
                                    <Animated.View
                                        style={{
                                            opacity: routeAnimations[idx]?.expanded
                                        }}
                                    >
                                        <Text style={[card.description, {fontSize: 14, marginBottom: 9}]}>Start date of movement:</Text>
                                        <View style={[common.row, {marginBottom: 34}]}>
                                            <Image source={calendar} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 12}} />
                                            <Text style={[card.name, {marginBottom: 0}]}>{route.dateTime}</Text>
                                        </View>

                                        <Text style={[card.description, {fontSize: 14, marginBottom: 9}]}>Start of movement</Text>
                                        <View style={[common.row, {marginBottom: 34}]}>
                                            <Image source={movement} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 12}} />
                                            <Text style={[card.name, {marginBottom: 0}]}>{route.move}</Text>
                                        </View>

                                        <Text style={[card.description, {fontSize: 14, marginBottom: 9}]}>Where are we going?</Text>
                                        <View style={common.row}>
                                            <Image source={wherearr} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 12}} />
                                            <Text style={[card.name, {marginBottom: 0}]}>{route.where}</Text>
                                        </View>
                                    </Animated.View>
                                ) : (
                                    <Animated.View 
                                        style={{width: '100%'}}
                                    >
                                        <View style={[common.row, {marginBottom: 24}]}>
                                            <Image source={movement} style={{width: 24, height: 24, resizeMode: 'contain', marginRight: 12}} />
                                            <Text style={[card.boldText, {fontSize: 14}]}>{route.route}</Text>
                                        </View>
                                        <View style={common.row}>
                                            <TouchableOpacity 
                                                onPress={() => toggleSelectedRoute(route.id, idx)}
                                                activeOpacity={0.7}
                                            >
                                                <Image source={openBtn} style={{width: 131, height: 45, resizeMode: 'contain', marginRight: 15}} />
                                            </TouchableOpacity>
                                            <Text style={[card.name, {marginBottom: 0}]}>{route.date}</Text>
                                        </View>
                                    </Animated.View>
                                )}
                            </Animated.View>
                            
                            {(openSelectedRoute && selectedRoute === route.id) && (
                                <Animated.View 
                                    style={[
                                        common.row,
                                        {
                                            opacity: routeAnimations[idx]?.expanded,
                                            transform: [
                                                { translateY: routeAnimations[idx]?.expanded.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [20, 0]
                                                })}
                                            ]
                                        }
                                    ]}
                                >
                                    <TouchableOpacity 
                                        onPress={() => handleShare(route)}
                                        activeOpacity={0.7}
                                    >
                                        <Image source={shareBtn} style={{width: 163, height: 61, resizeMode: 'contain', marginRight: 14}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => handleDelete(route.id, idx)}
                                        activeOpacity={0.7}
                                    >
                                        <Image source={deleteBtn} style={{width: 61, height: 61, resizeMode: 'contain'}} />
                                    </TouchableOpacity>
                                </Animated.View>
                            )}
                        </Animated.View>
                    ))}
                    
                    <View style={{height: 200}} />
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
                    <Text style={common.noText}>No planned routes</Text>
                </Animated.View>
            )}
        </View>
    );
};

export default NorthernRT;