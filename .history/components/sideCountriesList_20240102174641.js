

export  async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

export function countriesSearchList(list){
    list.then(()=>{
        return list ; 
    })
}

