
export default async function languageInfo(languageCode){
    let request = await fetch(`../LangCodeToEng/${languageCode}.txt`) ;  
    let response = await request.text() ; 

    return response.replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '') ; 

}

export async function getCountries(){
  try {
      let response = await fetch('https://restcountries.com/v3.1/all')
      let data= await response.json() ; 
      data.sort(function(a,b){
          if(a.population > b.population){
              return -1
          }else if(a.population < b.population){
              return 1
          }else{
              return 0 ; 
          }
      })
      return data ; 
  } catch (error) {
      console.error(error) ;
      return ; 
  }
}
export async function getCountriesLevels(){
  try {
      let response = await fetch('https://restcountries.com/v3.1/all')
      let data= await response.json() ; 
      data.sort(function(a,b){
          if(a.population > b.population){
              return -1
          }else if(a.population < b.population){
              return 1
          }else{
              return 0 ; 
          }
      })
      let hard  = data.filter(country=>{
        if(country.name.official.toLowerCase().includes('island')){
          return true ; 
        }
        return false ; 
      })
      let easy  = data.filter(country=>{
        if(!country.name.official.toLowerCase().includes('island') && country.population > 4000000){
          return true ; 
        }
        return false ; 
      }) 
      let medium  = data.filter(country=>{
        if(!country.name.official.toLowerCase().includes('island') && country.population <= 4000000){
          return true ; 
        }
        return false ; 
      })     
      return [easy, medium , hard] ; 
  } catch (error) {
      console.error(error) ;
      return ; 
  }
}
export async function countryGeoJSON(countryNames){
  
  for (let i = 0; i < countryNames.length; i++) {
    let index = 0 ; 
   
    let paths  =["main/byName" , 'main/byIso3' ] ; 
    do{
    try {
        let request = await fetch(`../countries/${paths[index]}/${countryNames[i]}.json`); 
        index++ ; 
        return await request.json() ; 
    } catch (error) {
      continue ; 
    }
    }while(index < paths.length )
      
  }
    return undefined ; 
    
  }

export function applyCountryGeoJSON(country,latlng){
  const mapid = L.map('mapid').setView(latlng,3) ; 
  const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' ; 
  const marker  = L.marker(latlng)
  L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapid);
    marker.addTo(mapid);
  countryGeoJSON(country).then(geoJSON=>{
    if(geoJSON != undefined){
      L.geoJSON(geoJSON, {
        style:{color: "var(--clr-primary-1)"} 
      }).addTo(mapid);
    }
  })
  
}

