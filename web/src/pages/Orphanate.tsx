import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import { useParams } from 'react-router-dom';

import mapMarkerImg from '../images/marker.svg';
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanate.css';
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanate {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    url: string;
  }>;
} 

interface OrphanateParams {
  id: string;
}

export default function Orphanage() {

  const params = useParams<OrphanateParams>() ;

  const [ orphanate, setOrphanate ] = useState<Orphanate>();
  const [ activeImageIndex, setActiveImageIndex ] = useState(0);

  useEffect(() => {
      api.get(`orphanates/${params.id}`).then(res => {
          setOrphanate(res.data);
      });
  }, [params.id]);

  if(!orphanate) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanate.images[activeImageIndex].url} alt={orphanate.name} />

          <div className="images">
            {orphanate.images.map((img, index) => (
              <button 
                key={index} 
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}
              >
                <img src={img.url} alt={orphanate.name} />
              </button>
            ))}            
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanate.name}</h1>
            <p>{orphanate.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanate.latitude,orphanate.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[orphanate.latitude,orphanate.longitude]} 
                />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanate.latitude},${orphanate.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanate.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanate.opening_hours}
              </div>
              
              {orphanate.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  {orphanate.open_on_weekends}
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos fim de semana<br />
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}