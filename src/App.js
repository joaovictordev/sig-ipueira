import React from 'react';
import { Map, 
  TileLayer, 
  ZoomControl, 
  LayersControl,
  ScaleControl,
  GeoJSON,
} from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import { GoogleLayer } from 'react-leaflet-google-v2';
import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';

import './App.css';
import ToolBar from './components/ToolBar';
import edificacoes from './data/edificacoes.json';
import quadras from './data/quadras.json';
import bairros from './data/bairros.json';

const { BaseLayer, Overlay } = LayersControl;
function App() {
  const bingKey = "AoKV3mtMdigVbKYfXMeIsS8z2MN4eJvCxVmorqjfgde9yjCiZ2josjNuaB7UBpGw";
  const googleKey = "AIzaSyDzzLNXuBgVKe-e2ncEHeDbMifq9Y0h5V0";

  function getGeoJSONEdificacoes(){ 
    return edificacoes;
  }

  function getGeoJSONQuadras(){ 
    return quadras;
  }

  function getGeoJSONBairros(){ 
    return bairros;
  }

  function onEachFeatureEdificacoes(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(`<span>Informações</span>
        <br/>ID: ${feature.properties.fid}
        <br/>Área (m²): ${feature.properties.area_m2}`);
    }
  }

  function onEachFeatureQuadras(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(`<span>Informações</span>
        <br/>ID: ${feature.properties.id}`);
    }
  }

  function onEachFeatureBairros(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        layer.bindPopup(`<span>Informações</span>
        <br/>ID: ${feature.properties.id}`);
    }
  }


  return (
    <div className="App">
      <Map 
        center={[-6.815734, -37.199024]}
        zoom={14}
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

          <Overlay name="Edificações" >
            <GeoJSON id="edificacoes"
              data={getGeoJSONEdificacoes()} 
              onEachFeature={onEachFeatureEdificacoes}
            />
          </Overlay>
          <Overlay name="Quadras">
            <GeoJSON id="quadras"
              data={getGeoJSONQuadras()} 
              onEachFeature={onEachFeatureQuadras}
              style={{ color: "#ff8c1a"}}
            />
          </Overlay>
          <Overlay name="Bairros">
            <GeoJSON id="bairros"
              data={getGeoJSONBairros()} 
              onEachFeature={onEachFeatureBairros}
              style={{ color: "#ff1ab3"}}
            />
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
