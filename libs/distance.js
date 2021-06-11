//R = earth Radio
const earthRadio = 6372.8;
const toRad = d => d * (Math.PI/180); 
const change = (currentPoint,endPoint) => currentPoint - endPoint;

const currentLat = toRad(18.912959);
const currentLong = toRad(-103.874536);
const endLat = toRad(18.940387);
const endLong = toRad(-103.967295);

//Δlat = lat2− lat1
const changeLat = change(currentLat,endLat);

//Δlong = long2− long1
const changeLong = change(currentLong,endLong);

//a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlong/2)
const a = Math.pow(Math.sin(changeLat/2),2) + Math.cos(currentLat) 
* Math.cos(endLat) * Math.pow(Math.sin(changeLong/2),2);

//c = 2 · atan2(√a, √(1−a))
const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

//d = R · c
const distance = (earthRadio * c).toFixed(2);

