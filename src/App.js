import React from 'react';
import { Map, 
  TileLayer, 
  ZoomControl, 
  LayersControl,
  ScaleControl,
  Circle,
  Popup,
  FeatureGroup
} from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import { GoogleLayer } from 'react-leaflet-google-v2';
import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';

import './App.css';
import ToolBar from './components/ToolBar';

const { BaseLayer, Overlay } = LayersControl;
function App() {
  const bingKey = "AoKV3mtMdigVbKYfXMeIsS8z2MN4eJvCxVmorqjfgde9yjCiZ2josjNuaB7UBpGw";
  const googleKey = "AIzaSyDzzLNXuBgVKe-e2ncEHeDbMifq9Y0h5V0";

  return (
    <div className="App">
      <Map 
        center={[-6.815734, -37.199024]}
        zoom={16}
        zoomControl={false} 
        style={{ height: `${100}%`}}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap Mapnik">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenTopoMap">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name='Bing Maps Roads'>
            <BingLayer  bingkey={bingKey} type="Road"/>
          </BaseLayer>
          <BaseLayer name='Bing Maps Satelite'>
            <BingLayer  bingkey={bingKey} />
          </BaseLayer>
          <BaseLayer name='Bing Maps Satelite with Labels'>
            <BingLayer  bingkey={bingKey} type="AerialWithLabels" />
          </BaseLayer>
          <BaseLayer name='Google Maps Roads'>
            <GoogleLayer googlekey={googleKey}  maptype='ROADMAP'/>
          </BaseLayer>
          <BaseLayer  name='Google Maps Terrain'>
            <GoogleLayer googlekey={googleKey}  maptype='TERRAIN' />
          </BaseLayer>

          <Overlay name="Feature group">
            <FeatureGroup color="#0f0">
              <Popup>Informações</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </Overlay>

        </LayersControl>
        <ZoomControl position="topright" />
        <ScaleControl 
          position="bottomright"
          imperial={false}
          maxWidth={200}
        />
      </Map>
      <ToolBar />
    </div>
  );
}

export default App;
