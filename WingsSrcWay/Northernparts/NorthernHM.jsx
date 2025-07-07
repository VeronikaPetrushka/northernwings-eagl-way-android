import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { info, logo, manHi, openAllBtn, pinLocation, readBtn } from '../Northernconst/wingsassts';
import wingsplaces from '../Northernconst/wingsplaces';
import { card, common, home } from '../Northernconst/wingsstyles';

const NorthernHM = () => {
    const navigation = useNavigation();
    const [openAll, setOpenAll] = useState(false);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const cardAnimations = useRef(wingsplaces.map(() => ({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(20)
    }))).current;

    useEffect(() => {
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
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            })
        ]).start();

        if (openAll) {
            const animations = wingsplaces.map((_, index) => {
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
                    })
                ]);
            });
            
            Animated.stagger(100, animations).start();
        } else {
            cardAnimations.forEach(anim => {
                anim.opacity.setValue(0);
                anim.translateY.setValue(20);
            });
        }
    }, [openAll]);

    const handleOpenAll = () => {
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
        ]).start(() => {
            setOpenAll(true);
            fadeAnim.setValue(0);
            slideUpAnim.setValue(30);
        });
    };

    const handleCloseAll = () => {
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
        ]).start(() => {
            setOpenAll(false);
            fadeAnim.setValue(0);
            slideUpAnim.setValue(30);
        });
    };

    return (
        <View style={common.container}>
            <Animated.View 
                style={{ 
                    width: '100%',
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideUpAnim },
                        { scale: scaleAnim }
                    ]
                }}
            >
                {openAll ? (
                    <View style={{ width: '100%' }}>
                        <Text style={[common.title, { alignSelf: 'center', fontSize: 22 }]}>
                            {'RECOMMENDED PLACES'.toUpperCase()}
                        </Text>
                        
                        <ScrollView style={{ width: '100%' }}>
                            {wingsplaces.map((place, idx) => (
                                <Animated.View
                                    key={idx}
                                    style={[
                                        card.container,
                                        {
                                            opacity: cardAnimations[idx].opacity,
                                            transform: [
                                                { translateY: cardAnimations[idx].translateY }
                                            ]
                                        }
                                    ]}
                                >
                                    <Image source={place.image} style={card.image} />
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
                                            onPress={() => {
                                                handleCloseAll();
                                                setTimeout(() => {
                                                    navigation.navigate('NorthernRP', {place});
                                                }, 350);
                                            }}
                                        >
                                            <Image source={readBtn} style={card.readBtn} />
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            ))}

                            <View style={{height: 200}} />
                        </ScrollView>
                    </View>
                ) : (
                    <ScrollView style={{ width: '100%' }}>
                        <View style={home.upperContainer}>
                            <Animated.Image 
                                source={logo} 
                                style={[
                                    common.smallLogo,
                                    { transform: [{ scale: scaleAnim }] }
                                ]} 
                            />

                            <Animated.View style={{ transform: [{ rotate: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['-30deg', '0deg']
                            }) }] }}>
                                <TouchableOpacity
                                    style={common.infoButton}
                                    onPress={() => navigation.navigate('Northerninformation')}
                                >
                                    <Image source={info} style={common.infoIcon} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                        <Animated.View 
                            style={[
                                card.container, 
                                {
                                    alignItems: 'center', 
                                    justifyContent: 'flex-end', 
                                    paddingVertical: 38, 
                                    marginBottom: 41,
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateY: slideUpAnim.interpolate({
                                            inputRange: [0, 30],
                                            outputRange: [0, 10]
                                        }) }
                                    ]
                                }
                            ]}
                        >
                            <Image source={manHi} style={home.man} />
                            <View style={{ width: '60%', alignSelf: 'flex-end'}}>
                                <Text style={[card.boldText, {marginBottom: 12}]}>
                                    Hello! Ready to get started?
                                </Text>
                                <Text style={card.boldText}>
                                    Browse the recommended places below and learn about the highlights, 
                                    for an evening stroll or a trip
                                </Text>
                            </View>
                        </Animated.View>

                        <Animated.Text 
                            style={[
                                common.title,
                                { 
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateX: slideUpAnim.interpolate({
                                            inputRange: [0, 30],
                                            outputRange: [0, -10]
                                        }) }
                                    ] 
                                }
                            ]}
                        >
                            {'RECOMMENDED PLACES'.toUpperCase()}
                        </Animated.Text>

                        <Animated.View 
                            style={[
                                card.container,
                                { 
                                    opacity: fadeAnim,
                                    transform: [
                                        { translateY: slideUpAnim }
                                    ]
                                }
                            ]}
                        >
                            <Image source={wingsplaces[0].image} style={card.image} />
                            <View style={{width: '60%'}}>
                                <Text style={card.name}>{wingsplaces[0].namer}</Text>
                                <View style={[common.row, {marginBottom: 11}]}>
                                    <Image source={pinLocation} style={card.pin} />
                                    <Text style={card.coordinates}>
                                        {wingsplaces[0].coordinates[0]}, {wingsplaces[0].coordinates[1]}
                                    </Text>
                                </View>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    style={card.description}
                                >
                                    {wingsplaces[0].description}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('NorthernRP', {place: wingsplaces[0]})}
                                >
                                    <Image source={readBtn} style={card.readBtn} />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                        <Animated.View style={{ opacity: fadeAnim }}>
                            <TouchableOpacity onPress={handleOpenAll}>
                                <Image source={openAllBtn} style={card.openBtn} />
                            </TouchableOpacity>
                        </Animated.View>
                        
                        <View style={{height: 200}} />
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    );
};

export default NorthernHM;