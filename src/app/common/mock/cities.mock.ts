const citiesMock: ResultDataDto[] = [{
  name: 'Novi Sad',
  lat:45.241786,
  lng: 19.844517,
  events: [{
      name: "Vremeplov",
      lat: 45.246899,
      lng: 19.837566
  },{
    name: "Marsal",
    lat: 45.242810,
    lng: 19.842782
  },{
    name: "Pro Kopi",
    lat: 45.244918,
    lng: 19.845760
  },{
    name: "Centar",
    lat: 45.256077,
    lng: 19.846822
  },{
    name: "Novosadko pozoriste",
    lat: 45.2544987,
    lng: 19.8432693
  }]
},{
  name: 'Zemun',
  lat: 44.846854,
  lng: 20.386909,
  events: [{
    name: "Teleoptik",
    lat: 44.852503,
    lng: 20.381251
  },{
    name: "Zemun Stadio",
    lat: 44.847634,
    lng: 20.398342
  },{
    name: "Zemunski park",
    lat: 44.840881,
    lng: 20.408983
  },{
    name: "Kej",
    lat: 44.843999,
    lng: 20.416515
  }]
}
];

export function findCity(name:String){
  return citiesMock.find((city)=> city.name === name);
}
