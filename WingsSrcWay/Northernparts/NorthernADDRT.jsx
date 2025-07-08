import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { backarr, calendar, createPlaceBtn, movement, savePlaceBtn, wherearr } from '../Northernconst/wingsassts';
import { common, route } from '../Northernconst/wingsstyles';

const ROUTES_KEY = 'northern_routes';

const NorthernADDRT = () => {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [startMove, setStartMove] = useState('');
    const [whereGoing, setWhereGoing] = useState('');

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const backBtnRotate = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const inputAnimations = useRef({
        date: new Animated.Value(0),
        start: new Animated.Value(0),
        where: new Animated.Value(0)
    }).current;

    React.useEffect(() => {
        Animated.spring(backBtnRotate, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true
        }).start();

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

        Animated.stagger(150, [
            Animated.timing(inputAnimations.date, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(inputAnimations.start, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(inputAnimations.where, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const animateButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.spring(buttonScale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true
            })
        ]).start();
    };

    const formatDateTime = () => {
        const date = startDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${date}, ${formattedHours}.${formattedMinutes} ${ampm}`;
    };

    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);

    const handleConfirmTime = (date) => {
        setStartTime(date);
        hideTimePicker();
    };

    const formatDate = () => {
        const date = startDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return date;
    };

    const addNewPlannedPlace = async () => {
        animateButtonPress();
        
        const newRoute = {
            id: Date.now(),
            route: `${startMove} → ${whereGoing}`,
            move: startMove,
            where: whereGoing,
            date: formatDate(),
            dateTime: formatDateTime(),
        };

        try {
            const stored = await AsyncStorage.getItem(ROUTES_KEY);
            const existingRoutes = stored ? JSON.parse(stored) : [];
            const updatedRoutes = [...existingRoutes, newRoute];
            await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(updatedRoutes));
            
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
        } catch (err) {
            console.error('Failed to save route:', err);
        }
    };

    const toggleCalendar = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(slideUpAnim, {
                toValue: 30,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => {
            setShowCalendar(!showCalendar);
            fadeAnim.setValue(0);
            slideUpAnim.setValue(30);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        });
    };

    return (
        <View style={common.container}>
            
            <Animated.View style={{
                transform: [{
                    rotate: backBtnRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-90deg', '0deg']
                    })
                }],
                width: 30, height: 30
            }}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={[common.back, {top: 0, left: 0}]}
                >
                    <Image source={backarr} style={common.backIcon} />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
            }}>
                {showCalendar ? (
                    <ScrollView style={{width: '100%'}}>
                        <Animated.Text style={[
                            common.title, 
                            { 
                                alignSelf: 'center', 
                                fontSize: 22, 
                                marginBottom: 35,
                                opacity: fadeAnim
                            }
                        ]}>
                            Select a start date
                        </Animated.Text>

                        <Animated.View style={{
                            opacity: fadeAnim,
                            transform: [{ scale: fadeAnim }]
                        }}>
                            <Calendar
                                onDayPress={(day) => {
                                    const selected = new Date(day.year, day.month - 1, day.day, 12);
                                    setStartDate(selected);
                                }}
                                markedDates={{
                                    [startDate.toISOString().split('T')[0]]: {
                                        selected: true,
                                        selectedColor: '#00adf5',
                                    },
                                }}
                                style={{
                                    borderRadius: 16,
                                    marginBottom: 20,
                                    width: '90%',
                                    alignSelf: 'center',
                                    overflow: 'hidden',
                                }}
                            />

                            <TouchableOpacity
                                onPress={showTimePicker}
                                style={[route.dateButton, {paddingLeft: 17, marginBottom: 40, width: '90%', marginTop: 20, alignSelf: 'center'}]}
                            >
                                <Text style={route.dateText}>Select Time: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                date={startTime}
                                onConfirm={handleConfirmTime}
                                onCancel={hideTimePicker}
                                is24Hour={false}
                                themeVariant="dark"
                                display="spinner"
                            />

                        </Animated.View>

                        <Animated.View style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideUpAnim }]
                        }}>
                            <TouchableOpacity 
                                onPress={toggleCalendar}
                                activeOpacity={0.7}
                            >
                                <Image source={savePlaceBtn} style={route.saveButton} />
                            </TouchableOpacity>
                        </Animated.View>

                        <View style={{height: 100}} />
                    </ScrollView>
                ) : (
                    <ScrollView style={{ width: '100%' }}>
                        <Animated.Text style={[
                            common.title, 
                            { 
                                alignSelf: 'center', 
                                fontSize: 22, 
                                marginBottom: 35,
                                opacity: fadeAnim,
                                transform: [{ translateY: slideUpAnim }]
                            }
                        ]}>
                            CREATE ROUTE
                        </Animated.Text>

                        <Animated.View 
                            style={[
                                route.dateButton,
                                {
                                    opacity: inputAnimations.date,
                                    transform: [
                                        { 
                                            translateX: inputAnimations.date.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0]
                                            }) 
                                        }
                                    ],
                                    paddingLeft: 17
                                }
                            ]}
                        >
                            <TouchableOpacity
                                onPress={toggleCalendar}
                                activeOpacity={0.7}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Image source={calendar} style={[route.icon, {position: 'static', marginRight: 20}]} />
                                <Text style={route.dateText}>{formatDateTime()}</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            style={[
                                { 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginBottom: 12 
                                },
                                {
                                    opacity: inputAnimations.start,
                                    transform: [
                                        { 
                                            translateX: inputAnimations.start.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0]
                                            }) 
                                        }
                                    ]
                                }
                            ]}
                        >
                            <Image source={movement} style={route.icon} />
                            <TextInput
                                style={route.input}
                                value={startMove}
                                onChangeText={setStartMove}
                                placeholder="Start of movement"
                                placeholderTextColor="#666"
                            />
                        </Animated.View>

                        <Animated.View 
                            style={[
                                { 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginBottom: 12 
                                },
                                {
                                    opacity: inputAnimations.where,
                                    transform: [
                                        { 
                                            translateX: inputAnimations.where.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0]
                                            }) 
                                        }
                                    ]
                                }
                            ]}
                        >
                            <Image source={wherearr} style={route.icon} />
                            <TextInput
                                style={route.input}
                                value={whereGoing}
                                onChangeText={setWhereGoing}
                                placeholder="Where are we going?"
                                placeholderTextColor="#666"
                            />
                        </Animated.View>

                        {(startMove && whereGoing) && (
                            <Animated.View
                                style={{
                                    opacity: fadeAnim,
                                    transform: [{ scale: buttonScale }]
                                }}
                            >
                                <TouchableOpacity
                                    onPress={addNewPlannedPlace}
                                    activeOpacity={0.7}
                                >
                                    <Image source={createPlaceBtn} style={route.saveButton} />
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                        
                        <View style={{height: 100}} />
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    );
};

export default NorthernADDRT;