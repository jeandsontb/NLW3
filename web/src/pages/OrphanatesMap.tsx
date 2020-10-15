import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/marker.svg';
import '../styles/pages/orphanates.css';
import api from '../services/api';


const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [178, 2]
});

interface Orphanate {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}   

function OrphanatesMap() {

    const [ orphanates, setOrphanates ] = useState<Orphanate[]>([]);

    console.log(orphanates);

    useEffect(() => {
        api.get('orphanates').then(res => {
            setOrphanates(res.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita </p>                    
                </header>


                <footer>
                    <strong>Garanhuns</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <Map
                center={[-8.885928, -36.484991]}
                zoom={15}
                style={{ width:'100%', height:'100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                {orphanates.map((orphanate, index) => (
                    <Marker 
                        key={index}
                        icon={mapIcon}
                        position={[orphanate.latitude, orphanate.longitude]}
                    >
                        <Popup 
                            closeButton={false} 
                            minWidth={240} 
                            maxWidth={240} 
                            className="map-popup"
                        >
                            {orphanate.name} 
                            <Link to={`/orphanates/${orphanate.id}`} >
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}

            </Map>

            <Link to="/orphanates/create" className="create-orphanates" >
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );
}

export default OrphanatesMap;