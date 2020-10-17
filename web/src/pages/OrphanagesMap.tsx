import React from 'react';

import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import MapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({
  iconUrl: MapMarkerImg,
  iconSize: [58,68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>SP</span>
        </footer>
      </aside>
        <Map
          center={[-23.5519153,-46.5997832]}
          zoom={15}
          style={{ width: '100%', height: '100%'}}
        >
          <TileLayer url='http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'/>
          {/* Mapbox url https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}/@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN} */}

          <Marker 
            position={[-23.5519153,-46.5997832]}
            icon={mapIcon}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              Lar das Meninas
              <Link to="">
                <FiArrowRight size={20} color="#FFF"/>
              </Link>
            </Popup>
          </Marker>
        </Map>

        <Link to="" className="create-orphanage">
          <FiPlus  size={32} color="#FFF"/>
        </Link>
    </div>
  );
}

export default OrphanagesMap;