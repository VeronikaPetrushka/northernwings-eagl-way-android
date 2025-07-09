import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const nvgt = StyleSheet.create({
    
    container: {
        width: '90%',
        backgroundColor: '#272727',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 22,
        alignSelf: 'center'
    },

    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    button: {
        width: 66,
        height: 66,
        borderRadius: 22,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }

});


export const board = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: height * 0.06,
        paddingBottom: 20
    },

    manImg: {
        width: '100%',
        height: height * 0.47,
        resizeMode: 'contain',
        zIndex: 12,
        position: 'absolute',
        top: 50
    },

    eagle: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'contain',
        zIndex: 10,
        marginRight: -10
    },

    eagles: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'contain',
        zIndex: 10
    },

    textContainer: {
        width: '100%',
        borderRadius: 22,
        backgroundColor: '#272727',
        paddingVertical: 27,
        paddingHorizontal: 47,
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.12,
        alignSelf: 'center',
        zIndex: 20,
        height: 270,
        justifyContent: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 23
    },

    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16
    },

    button: {
        width: 170,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3C3C3C',
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    }

});


export const common = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        paddingTop: height * 0.07,
        paddingHorizontal: 20
    },

    smallLogo: {
        width: 88,
        height: 88,
        resizeMode: 'cover',
        borderRadius: 22
    },

    infoButton: {
        width: 66,
        height: 66,
        borderRadius: 22,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16
    },

    back: {
        position: 'absolute',
        top: height * 0.07,
        left: 20
    },

    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },

    bigLogo: {
        width: '100%',
        height: height * 0.37,
        resizeMode: 'contain',
        borderRadius: 22,
        marginBottom: 20
    },

    noText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        marginVertical: '50%',
        textAlign: 'center',
        alignSelf: 'center'
    }

});


export const home = StyleSheet.create({

    upperContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 22,
        borderColor: '#272727',
        marginBottom: 40,
        borderWidth: 1
    },

    man: {
        width: 140,
        height: 207,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        left: 0
    },

});


export const card = StyleSheet.create({

    container: {
        width: '100%',
        padding: 16,
        backgroundColor: '#272727',
        borderRadius: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },

    boldText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },

    image: {
        width: '35%',
        height: 156,
        borderRadius: 22,
        resizeMode: 'cover',
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 14
    },

    pin: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginRight: 8
    },

    coordinates: {
        fontSize: 10,
        fontWeight: '500',
        color: '#fff',
    },

    description: {
        fontSize: 10,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 10
    },

    readBtn: {
        width: 113,
        height: 46,
        resizeMode: 'contain'
    },

    openBtn: {
        width: '100%',
        height: 61,
        resizeMode: 'contain'
    }

});


export const route = StyleSheet.create({

    input: {
        width: '100%',
        borderRadius: 22,
        backgroundColor: '#272727',
        paddingHorizontal: 17,
        paddingLeft: 60,
        paddingVertical: 20,
        marginBottom: 12,
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    icon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        position: 'absolute',
        left: 17,
        top: 19,
        zIndex: 10
    },

    dateButton: {
        width: '100%',
        borderRadius: 22,
        backgroundColor: '#272727',
        paddingHorizontal: 17,
        paddingLeft: 60,
        paddingVertical: 20,
        marginBottom: 12,
    },

    dateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    saveButton: {
        width: 163,
        height: 61,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    addButton: {
        width: 66,
        height: 66,
        resizeMode: 'contain',
    },

});


export const darkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#1d2c4d' }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8ec3b9' }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#1a3646' }]
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#4b6878' }]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#2d2d2d' }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#383838' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    }
];