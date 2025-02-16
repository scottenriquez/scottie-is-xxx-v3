import React from "react"
import getGoogleMapsAPIKey from '../../services/googleMapsAPIKeyService.js'
import getGoogleMapsOptionsSettings from '../../services/googleMapsOptionsService.js'
import GoogleMapReact from 'google-map-react'
import MapMarker from './mapMarker.js'

export default function({ defaultZoom, defaultCenter, markers }) {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: getGoogleMapsAPIKey() }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            options={getGoogleMapsOptionsSettings()}
        >
            {markers.map(({lat, lng}) => (
                <MapMarker key={lat} lat={lat} lng={lng} />
            ))}
        </GoogleMapReact>
    )
}
