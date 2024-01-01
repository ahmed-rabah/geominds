
export default async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        console.log(data) ;
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}