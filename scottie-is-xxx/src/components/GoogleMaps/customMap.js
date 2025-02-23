import React from "react"
import getGoogleMapsAPIKey from '../../services/googleMapsAPIKeyService.js'
import getGoogleMapsOptionsSettings from '../../services/googleMapsOptionsService.js'
import { Marker, APIProvider, Map } from '@vis.gl/react-google-maps';

export default function({ defaultZoom, defaultCenter, markers }) {
    const { styles } = getGoogleMapsOptionsSettings();
    return (
        <APIProvider apiKey={getGoogleMapsAPIKey()}>
            <Map
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                styles={styles}
            >
                {markers.map(({ lat, lng }, i) => (
                    <Marker key={i} position={{ lat, lng }} />
                ))}
            </Map>
        </APIProvider>
    )
}
