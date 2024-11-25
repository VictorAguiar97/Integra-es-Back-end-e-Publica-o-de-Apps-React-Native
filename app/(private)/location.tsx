import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker, MapPressEvent, LatLng, Region } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

interface MarkerData extends LatLng {
    description: string;
    mapColor: string;
}

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [markers, setMarkers] = useState<Array<MarkerData>>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [region, setRegion] = useState<Region | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const [mapColor, setMapColor] = useState<string>('#fff');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setMessage('A permissão foi negada!');
            } else {
                let location = await Location.getCurrentPositionAsync();
                setLocation(location);
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers');
            if (markersStorage) {
                setMarkers(JSON.parse(markersStorage));
            }
        })();
    }, []);

    const handleMapPress = async (mapPress: MapPressEvent) => {

        if (!description || mapColor === '#fff') {
            Alert.alert('Atenção', 'Por favor, preencha o nome e selecione uma cor antes de salvar o marcador.');
            return;
        }

        const { coordinate } = mapPress.nativeEvent;
        const newMarker: MarkerData = { ...coordinate, description, mapColor };

        const markersStorage = await AsyncStorage.getItem('markers');
        let markersList: Array<MarkerData> = markersStorage ? JSON.parse(markersStorage) : [];
        markersList.push(newMarker);
        await AsyncStorage.setItem('markers', JSON.stringify(markersList));
        setMarkers(markersList);
        setDescription('');
    };

    const clearMarkers = async () => {
        await AsyncStorage.removeItem('markers');
        setMarkers([]);
    };

    const viewSavedCoordinates = () => {
        if (markers.length === 0) {
            Alert.alert("Nenhuma coordenada salva", "Não há coordenadas salvas.");
        } else {
            const coordinatesList = markers.map((marker, index) => (
                `${index + 1}: Latitude: ${marker.latitude.toFixed(2)} - Longitude: ${marker.longitude.toFixed(2)} - Descrição: ${marker.description || 'N/A'}`
            )).join("\n");

            Alert.alert("Coordenadas Salvas", coordinatesList, [
                {
                    text: "Fechar",
                    onPress: () => {}
                }
            ]);
        }
    };

    const moveToSavedCoordinate = (coordinate: LatLng) => {
        setRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <View style={[styles.container]}>
            <Text style={styles.headerText}>Localização</Text>
            {message && <Text style={styles.messageText}>{message}</Text>}
            {location && (
                <>
                    <Text style={styles.locationText}>Long: {location.coords.longitude.toFixed(2)}</Text>
                    <Text style={styles.locationText}>Lat: {location.coords.latitude.toFixed(2)}</Text>
                    <Text style={styles.markerText}>Marcadores: {markers.length}</Text>
                </>
            )}
            <TextInput
                style={styles.input}
                placeholder="Descrição do marcador"
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.subHeaderText}>Paleta de cores:</Text>
            <View style={styles.palette}>
                {['#f0f8ff', '#d1ffd1', '#ffd1d1', '#d1d1ff'].map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorCircle, { backgroundColor: color }]}
                        onPress={() => setMapColor(color)}
                    />
                ))}
            </View>
            <MapView
                style={styles.locationMapView}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation
                onPress={handleMapPress}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        draggable
                        coordinate={marker}
                        title={`Descrição: ${marker.description}`}
                        onPress={() => moveToSavedCoordinate(marker)}
                        pinColor={marker.mapColor}
                    />
                ))}
            </MapView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={clearMarkers}>
                    <FontAwesome name="trash" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#3498db' }]} onPress={viewSavedCoordinates}>
                    <MaterialIcons name="visibility" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Visualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    markerText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    locationMapView: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    palette: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
