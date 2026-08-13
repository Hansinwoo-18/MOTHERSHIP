const map = L.map("networkMap").setView([20, 0], 2);

L.tileLayer(
"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
{
    attribution:"MOTHERSHIP",
    maxZoom:19
}
).addTo(map);

const colors = {
    green:"#00ff66",
    blue:"#00bfff",
    purple:"#b84dff",
    yellow:"#ffd400",
    red:"#ff3333"
};

const names = [
"Raven","Ghost","Atlas","Nova","Cipher","Orion",
"Phoenix","Viper","Titan","Specter","Valkyrie","Echo",
"Shadow","Falcon","Hunter","Sentinel","Aegis","Blaze",
"Drake","Zephyr","Nexus","Eclipse","Hawk","Storm"
];

const cities = [
{city:"New York",lat:40.7128,lng:-74.0060},
{city:"Los Angeles",lat:34.0522,lng:-118.2437},
{city:"Chicago",lat:41.8781,lng:-87.6298},
{city:"Toronto",lat:43.6532,lng:-79.3832},
{city:"Mexico City",lat:19.4326,lng:-99.1332},
{city:"London",lat:51.5072,lng:-0.1276},
{city:"Paris",lat:48.8566,lng:2.3522},
{city:"Berlin",lat:52.52,lng:13.405},
{city:"Madrid",lat:40.4168,lng:-3.7038},
{city:"Rome",lat:41.9028,lng:12.4964},
{city:"Warsaw",lat:52.2297,lng:21.0122},
{city:"Moscow",lat:55.7558,lng:37.6173},
{city:"Kyiv",lat:50.4501,lng:30.5234},
{city:"Delhi",lat:28.6139,lng:77.2090},
{city:"Mumbai",lat:19.076,lng:72.8777},
{city:"Bangalore",lat:12.9716,lng:77.5946},
{city:"Kolkata",lat:22.5726,lng:88.3639},
{city:"Tokyo",lat:35.6762,lng:139.6503},
{city:"Osaka",lat:34.6937,lng:135.5023},
{city:"Seoul",lat:37.5665,lng:126.9780},
{city:"Beijing",lat:39.9042,lng:116.4074},
{city:"Shanghai",lat:31.2304,lng:121.4737},
{city:"Hong Kong",lat:22.3193,lng:114.1694},
{city:"Singapore",lat:1.3521,lng:103.8198},
{city:"Jakarta",lat:-6.2088,lng:106.8456},
{city:"Bangkok",lat:13.7563,lng:100.5018},
{city:"Sydney",lat:-33.8688,lng:151.2093},
{city:"Melbourne",lat:-37.8136,lng:144.9631},
{city:"Perth",lat:-31.9523,lng:115.8613},
{city:"Cape Town",lat:-33.9249,lng:18.4241},
{city:"Johannesburg",lat:-26.2041,lng:28.0473},
{city:"Cairo",lat:30.0444,lng:31.2357},
{city:"Nairobi",lat:-1.2921,lng:36.8219},
{city:"Rio",lat:-22.9068,lng:-43.1729},
{city:"Sao Paulo",lat:-23.5505,lng:-46.6333},
{city:"Buenos Aires",lat:-34.6037,lng:-58.3816},
{
    name: "Sinu han ",
    code: "green",
    city: "Ara, Bihar",
    status: "ONLINE",
    lat: 25.5560,
    lng: 84.6633
}
];

const operators = [];

// 8 Green
for(let i=1;i<=8;i++){
    operators.push({
        name:`${names[i]}-${i}`,
        code:"green",
        status:"ONLINE",
        ...cities[i]
    });
}

// 30 Blue
for(let i=1;i<=30;i++){
    operators.push({
        name:`${names[i%names.length]}-B${i}`,
        code:"blue",
        status:"ONLINE",
        ...cities[i%cities.length]
    });
}

// 31 Purple
for(let i=1;i<=31;i++){
    operators.push({
        name:`${names[i%names.length]}-P${i}`,
        code:"purple",
        status:"ONLINE",
        ...cities[(i+5)%cities.length]
    });
}

// 31 Yellow
for(let i=1;i<=31;i++){
    operators.push({
        name:`${names[i%names.length]}-Y${i}`,
        code:"yellow",
        status:"ONLINE",
        ...cities[(i+10)%cities.length]
    });
}

// 30 Red
for(let i=1;i<=30;i++){
    operators.push({
        name:`${names[i%names.length]}-R${i}`,
        code:"red",
        status:"ACTIVE",
        ...cities[(i+15)%cities.length]
    });
}

operators.forEach((operator, index) => {

    // Small offset so markers at the same city don't overlap
    const offset = ((index % 5) - 2) * 0.35;

    const marker = L.circleMarker(
        [
            operator.lat + offset,
            operator.lng + offset
        ],
        {
            radius: 8,
            color: colors[operator.code],
            fillColor: colors[operator.code],
            fillOpacity: 1,
            weight: 2
        }
    ).addTo(map);

    marker.bindPopup(`
        <b>${operator.name}</b><br>
        CODE: ${operator.code.toUpperCase()}<br>
        CITY: ${operator.city}<br>
        STATUS: ${operator.status}
    `);

});


L.tileLayer(
"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
{
    attribution:"MOTHERSHIP"
}
).addTo(map);
function color(code){

    if(code==="green") return "#00ff66";
    if(code==="blue") return "#00aaff";
    if(code==="purple") return "#bb66ff";
    if(code==="yellow") return "#ffd400";
    return "#ff3333";
}

operators.forEach(op=>{

    const marker = L.circleMarker(
        [op.lat, op.lng],
        {
            radius:8,
            color:color(op.code),
            fillColor:color(op.code),
            fillOpacity:1,
            weight:2
        }
    ).addTo(map);

    marker.bindPopup(`
        <div style="color:black">
            <b>${op.name}</b><br>
            CODE: ${op.code.toUpperCase()}<br>
            CITY: ${op.city}<br>
            STATUS: ${op.status}
        </div>
    `);
});