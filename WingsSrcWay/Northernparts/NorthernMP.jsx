import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Share } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import wingsplaces from '../Northernconst/wingsplaces';
import { saveBtn, savedBtn, shareSmall, pinLocation, readBtn, backarr } from '../Northernconst/wingsassts';
import { card, common, darkMapStyle } from '../Northernconst/wingsstyles';

const STORAGE_KEY = 'saved_places';

const MapSight = ({ place, setReadplace }) => {
    return (
        <View style={[card.container, {position: 'absolute', alignSelf: 'center', top: 80, width: '90%'}]}>
            <Image source={place.image} style={card.image} />
            <View style={{width: '60%'}}>
                <Text style={card.name} >{place.namer}</Text>
                <View style={[common.row, {marginBottom: 11}]}>
                    <Image source={pinLocation} style={card.pin}  />
                    <Text style={card.coordinates} >{place.coordinates[0]}, {place.coordinates[1]}</Text>
                </View>
                <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={card.description} 
                >
                    {place.description}
                </Text>
                <TouchableOpacity onPress={() => setReadplace(true)}>
                    <Image source={readBtn} style={card.readBtn}  />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const NorthernMP = () => {
    const [selectedMapSight, setSelectedMapSight] = useState(null);
    const [isPlaceSaved, setIsPlaceSaved] = useState(false);
    const [readPlace, setReadplace] = useState(false);

    useEffect(() => {
        if (selectedMapSight) {
            checkIfSaved(selectedMapSight);
        }
    }, [selectedMapSight]);

    const checkIfSaved = async (place) => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            const savedPlaces = saved ? JSON.parse(saved) : [];
            const exists = savedPlaces.some(p => p.namer === place.namer);
            setIsPlaceSaved(exists);
        } catch (err) {
            console.error('Error checking saved place:', err);
        }
    };

    const toggleSavePlace = async () => {
        if (!selectedMapSight) return;
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            let savedPlaces = saved ? JSON.parse(saved) : [];

            if (isPlaceSaved) {
                savedPlaces = savedPlaces.filter(p => p.namer !== selectedMapSight.namer);
            } else {
                savedPlaces.push(selectedMapSight);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
            setIsPlaceSaved(!isPlaceSaved);
        } catch (err) {
            console.error('Error toggling saved place:', err);
        }
    };

    const sharePlace = async () => {
        if (!selectedMapSight) return;
        try {
            await Share.share({
                message: `Check out this place: ${selectedMapSight.namer}\nCoordinates: ${selectedMapSight.coordinates[0]}, ${selectedMapSight.coordinates[1]}\nDescription: ${selectedMapSight.description}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>MAP</Text>

            {readPlace ? (
                <View style={[common.container, {paddingTop: 120}]}>
                    <TouchableOpacity
                        onPress={() => { setReadplace(false); setSelectedMapSight(null) }}
                        style={common.back}
                    >
                        <Image source={backarr} style={common.backIcon} />
                    </TouchableOpacity>
                    
                    <ScrollView style={{ width: '100%' }}>
                        <View style={[card.container, {flexDirection: 'column'}]}>
                            <Image
                                source={selectedMapSight.image}
                                style={[card.image, { width: '100%', marginBottom: 20 }]}
                            />
                            <View style={[common.row, {marginBottom: 20}]}>
                                <Image source={pinLocation} style={[card.pin, {width: 26, height: 26}]} />
                                <Text style={[card.coordinates, {fontSize: 13}]}>{selectedMapSight.coordinates[0]}, {selectedMapSight.coordinates[1]}</Text>
                            </View>
                            <Text style={card.name}>DESCRIPTION</Text>
                            <Text style={[card.description, {fontSize: 13, marginBottom: 30}]}>{selectedMapSight.description}</Text>

                            <View style={[common.row, {alignItems: 'center', justifyContent: 'flex-start'}]}>
                                <TouchableOpacity
                                    onPress={sharePlace}
                                >
                                    <Image
                                        source={shareSmall}
                                        style={{ width: 64, height: 64, resizeMode: 'contain', marginRight: 20 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={toggleSavePlace}
                                >
                                    <Image
                                        source={isPlaceSaved ? savedBtn : saveBtn}
                                        style={{ width: 64, height: 64, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>
            ) : (
                    <>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                            latitude: 49.0,
                            longitude: -83.0,
                            latitudeDelta: 30,
                            longitudeDelta: 30,
                            }}
                            customMapStyle={darkMapStyle}
                            provider="google"
                        >
                            {wingsplaces.map((place, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                latitude: place.coordinates[1],
                                longitude: place.coordinates[0],
                                }}
                                onPress={() => setSelectedMapSight(place)}
                            />
                            ))}
                        </MapView>

                        {selectedMapSight && (
                            <MapSight place={selectedMapSight} setReadplace={setReadplace} />
                        )}
                </>
            )}
        </View>
    );
};

export default NorthernMP;
