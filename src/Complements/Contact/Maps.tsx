import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { divIcon, point } from 'leaflet'
import type { LatLngTuple, LatLngExpression } from 'leaflet'

interface OfficeMarker {
  geocode: LatLngTuple
  popUp: string
}

const pinSvg = renderToStaticMarkup(
  <MapPin color="#500b0b" fill="#a81212" size={35} strokeWidth={2} />
)

const customIcon = divIcon({
  html: pinSvg,
  className: 'border-0 bg-transparent',
  iconSize: [40, 40],
  iconAnchor: [16, 30],
  popupAnchor: [0, -28],
})

const clusterPinSvg = renderToStaticMarkup(
  <MapPin color="#500b0b" fill="#a81212" size={32} strokeWidth={2} />
)

interface ClusterLike {
  getChildCount: () => number
}

const createClusterCustomIcon = (cluster: ClusterLike) =>
  divIcon({
    html: `
      <div class="relative flex h-8 w-8 items-center justify-center">
        ${clusterPinSvg}
        <span class="absolute top-2 text-[10px] font-extrabold text-white">${cluster.getChildCount()}</span>
      </div>
    `,
    className: 'border-0 bg-transparent',
    iconSize: point(32, 32, true),
    iconAnchor: [16, 29],
  })

const markers: OfficeMarker[] = [
  { geocode: [9.915085533193173, -84.0457210670351], popUp: 'Oficina Central Curridabat. San Francisco<br/>correo electrónico: costarica@grupocastrofallas.com' },
  { geocode: [9.948241661779358, -84.07604437310071], popUp: 'Oficina Central Goicochea, Calle Blancos<br/>correo electrónico: costarica@grupocastrofallas.com' },
  { geocode: [13.46912079583891, -85.2733906614443], popUp: 'Oficina Nicaragua<br/>correo electrónico: nicaragua@grupocastrofallas.com' },
  { geocode: [39.54230836449892, -101.84087340935952], popUp: 'Oficina USA<br/>correo electrónico: usa@grupocastrofallas.com' },
  { geocode: [-10.94794924607444, -74.74247102841893], popUp: 'Oficina Perú<br/>correo electrónico: peru@grupocastrofallas.com' },
  { geocode: [34.70672549614855, 103.11684637190575], popUp: 'Oficina China<br/>correo electrónico: china@grupocastrofallas.com' },
  { geocode: [-8.482441641225016, -56.40636426171537], popUp: 'Oficina Brasil<br/>correo electrónico: brasil@grupocastrofallas.com' },
  { geocode: [24.178908261467836, -103.46999241292284], popUp: 'Oficina México<br/>correo electrónico: mexico@grupocastrofallas.com' },
  { geocode: [15.737811820859697, -90.38080905497554], popUp: 'Oficina Guatemala<br/>correo electrónico: guatemala@grupocastrofallas.com' },
  { geocode: [8.566968471927227, -80.11959503022514], popUp: 'Oficina Panamá<br/>correo electrónico: panama@grupocastrofallas.com' },
  { geocode: [36.66815866487394, 138.3889060978813], popUp: 'Oficina Japón<br/>correo electrónico: japon@grupocastrofallas.com' },
  { geocode: [13.697650453973681, -89.21880515911914], popUp: 'Oficina El Salvador<br/>correo electrónico: salvador@grupocastrofallas.com' },
  { geocode: [22.912290355139113, 78.99855934480858], popUp: 'Oficina India<br/>correo electrónico: india@grupocastrofallas.com' },
  { geocode: [51.131320813684, 10.23112667820357], popUp: 'Oficina Alemania<br/>correo electrónico: alemania@grupocastrofallas.com' },
  { geocode: [3.4708146336733594, -73.78032484349183], popUp: 'Oficina Colombia<br/>correo electrónico: colombia@grupocastrofallas.com' },
  { geocode: [39.598872488934305, -3.6322701236618204], popUp: 'Oficina España<br/>correo electrónico: espana@grupocastrofallas.com' },
  { geocode: [52.19173769305382, 5.706617182549954], popUp: 'Oficina Holanda<br/>correo electrónico: holanda@grupocastrofallas.com' },
  { geocode: [14.894902281974526, -87.00326180265341], popUp: 'Oficina Honduras<br/>correo electrónico: honduras@grupocastrofallas.com' },
  { geocode: [46.52166759807105, 2.235425022150667], popUp: 'Oficina Francia<br/>correo electrónico: francia@grupocastrofallas.com' },
  { geocode: [-4.513414852872824, 121.88931514717682], popUp: 'Oficina Indonesia<br/>correo electrónico: indonesia@grupocastrofallas.com' },
  { geocode: [23.459617189947128, 121.25712937200021], popUp: 'Oficina Taiwán<br/>correo electrónico: taiwan@grupocastrofallas.com' },
  { geocode: [15.385970263351584, 100.66310951135716], popUp: 'Oficina Thailandia<br/>correo electrónico: thailandia@grupocastrofallas.com' },
  { geocode: [-30.85430592586592, 24.1864349179294], popUp: 'Oficina Sudáfrica<br/>correo electrónico: sudafrica@grupocastrofallas.com' },
  { geocode: [-23.221502177920815, -58.4618386170718], popUp: 'Oficina Paraguay<br/>correo electrónico: paraguay@grupocastrofallas.com' },
  { geocode: [-35.140772366879006, -66.0523202719648], popUp: 'Oficina Argentina<br/>correo electrónico: argentina@grupocastrofallas.com' },
  { geocode: [-26.49448009031793, -70.18319905977701], popUp: 'Oficina Chile<br/>correo electrónico: chile@grupocastrofallas.com' },
  { geocode: [60.489970878222174, -110.59295118967651], popUp: 'Oficina Canadá<br/>correo electrónico: canada@grupocastrofallas.com' },
  { geocode: [43.09309490736015, 12.529588815253362], popUp: 'Oficina Italia<br/>correo electrónico: italia@grupocastrofallas.com' },
  { geocode: [-1.465947166784015, -78.28522334019827], popUp: 'Oficina Ecuador<br/>correo electrónico: ecuador@grupocastrofallas.com' },
  { geocode: [36.34371354642492, 127.89090733239382], popUp: 'Oficina Korea<br/>correo electrónico: korea@grupocastrofallas.com' },
]

const centerPosition: LatLngExpression = [9.915085533193173, -84.0457210670351]

const MyMap: React.FC = () => {
  return (
    <MapContainer
      center={centerPosition}
      zoom={5}
      className="mx-auto h-[60vh] w-full max-w-[1100px] rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>
              <div dangerouslySetInnerHTML={{ __html: marker.popUp }} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MyMap
