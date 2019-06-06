import * as L from 'leaflet';
// import '../../../vendors/leaflet-control-geocoder';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-routing-machine';
import Converter from '../../../functions/Converter';

class MapsWidget{

  MAPBOX_TOKEN = 'pk.eyJ1IjoiamVzc3lwOTgiLCJhIjoiY2p3aWZhczFqMm5uNTRia2RqcXVydjV6NSJ9.IntbzavmhMPyzdTlN05R2g';

  OPTIONS = {
    zoomControl: false
  };

  POSITION = {
    location: { lat: 45, lng: -73 },
    zoom: 10,
    target: {
      position: {},
      marker: undefined,
    },
  };

  ROUTE = {
    itinerary: {},
    router: undefined,
    points: [],
  };

  GEOCODER = {
    provider: undefined,
    searchControl: undefined,
    results: [],
  }

  MAP_CENTERED = false;

  constructor(context){
    this.CONTEXT = context;
    this.HOST = this.CONTEXT.HOST;
    this.SOCKET = this.CONTEXT.SOCKET;
  }

  initialise = () => {
    this.generateMap();
    this.setTiles();
    this.setGeoCoding();
    this.initListeners();
  }

  initListeners = () => {
    this.geolocate();
    this.MAP.on('movestart', this.onMoveStart);
  }

  onMoveStart = (e) => {
    this.MAP_CENTERED = false;
    this.CONTEXT.forceUpdate();
  }

  onMoveEnd = (e) => {
    this.MAP_CENTERED = true;
    this.CONTEXT.forceUpdate();
  }

  generateMap = () => {
    this.MAP = L.map('map-placeholder', this.OPTIONS).setView([this.POSITION.location.lat, this.POSITION.location.lng], this.POSITION.zoom);
    if(this.POSITION.target.location) this.POSITION.target.marker = this.setTarget(this.POSITION.target.location);
    if(this.ROUTE.router) this.setRoute(this.ROUTE.points);
  }

  setGeoCoding = () => {
    this.GEOCODER.provider = new OpenStreetMapProvider();

    this.GEOCODER.searchControl = new GeoSearchControl({
      provider: this.GEOCODER.provider,
    });

    // this.MAP.addControl(this.GEOCODER.searchControl);
  }

  setTiles = () => {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.MAPBOX_TOKEN,
    }).addTo(this.MAP);
  }

  geolocate = () => {
    this.MAP.locate({
      watch: true,
    });
    this.MAP.on('locationfound', this.onLocationUpdate);
  }

  setTarget = (pos) => {
    const marker = L.marker(pos).addTo(this.MAP);

    return marker;
  }

  onLocationUpdate = (e) => {
    if( this.POSITION.location.lat !== e.latlng.lat && this.POSITION.location.lng !== e.latlng.lng ) {
      this.reLocate(e.latlng, 17);
      this.POSITION.target.location = e.latlng;
      this.POSITION.target.marker = this.setTarget(e.latlng);
    }
  }

  reCenter = () => {
    this.reLocate(this.POSITION.location, 17)
  }

  reLocate = (pos, zoom = 15) => {
    this.POSITION.location = pos;
    this.POSITION.zoom = zoom;
    this.MAP.flyTo(pos, zoom);
    this.MAP.once('moveend', this.onMoveEnd)
  }

  geoSearch = async(address) => {
    const res = await this.GEOCODER.provider.search({ query: address });
    return res;
  }

  filterPoints = async(points) => {
    const validPoints = [];

    for(const point of points){
      console.log(point);
      if(point === 'here'){
        console.log('own pos');
        validPoints.push(this.POSITION.location);
        continue;
      }

      const location = await this.geoSearch(point);

      if(location[0]) validPoints.push({
        lat: location[0].y,
        lng: location[0].x,
      });
    }

    return validPoints;
  }

  setRoute = async(points) => {
    points = await this.filterPoints(points);
    console.log(points);
    if(points.length < 2) return;

    if(this.ROUTE.router){
      this.ROUTE.router.remove();
      this.ROUTE.router = undefined;
      this.ROUTE.points = [];
    }

    this.ROUTE.points = points;
    const destinations = points.map(pos => L.latLng(pos));

    if(this.ROUTE.router === undefined){
      this.ROUTE.router = L.Routing.control({
        waypoints: destinations,
        geocoder: this.GEOCODER,
        icon: this.MARKER
      })
      .addTo(this.MAP)
      .on('routesfound', this.onRoutesFound);

      if(this.POSITION.target.marker) this.MAP.removeLayer(this.POSITION.target.marker);
    }
  }

  onRoutesFound = (e) => {
    console.log(e);
    const routes = e.routes[0];

    const totalTime = Converter.secondToTime(routes.summary.totalTime);
    const totalDistance = Converter.mToKm(routes.summary.totalDistance);
    const instructions = routes.instructions.map(instruction => {
      if(instruction.road === '') instruction.road = instruction.text;
      if(instruction.modifier === undefined) instruction.modifier = 'Straight';
      instruction.distance = Converter.mToKm(instruction.distance);
      return instruction;
    })

    this.ROUTE.itinerary = {
      totalTime,
      totalDistance,
      instructions: instructions,
    }

    this.CONTEXT.forceUpdate();
  }

}

export default MapsWidget
