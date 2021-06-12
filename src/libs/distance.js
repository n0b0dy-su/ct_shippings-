//R = earth Radio

function calc(currentLat,currentLong,endLat,endLong){
    const earthRadio = 6372.8;
    const toRad = d => d * (Math.PI/180); 
    const change = (currentPoint,endPoint) => currentPoint - endPoint;

    const currentLatRad = toRad(currentLat);
    const currentLongRad = toRad(currentLong);
    const endLatRad = toRad(endLat);
    const endLongRad = toRad(endLong);

    //Δlat = lat2− lat1
    const changeLat = change(currentLatRad,endLatRad);

    //Δlong = long2− long1
    const changeLong = change(currentLongRad,endLongRad);

    //a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlong/2)
    const a = Math.pow(Math.sin(changeLat/2),2) + Math.cos(currentLatRad) 
    * Math.cos(endLatRad) * Math.pow(Math.sin(changeLong/2),2);

    //c = 2 · atan2(√a, √(1−a))
    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    //d = R · c
    return (earthRadio * c).toFixed(2);
}

module.exports = calc;
