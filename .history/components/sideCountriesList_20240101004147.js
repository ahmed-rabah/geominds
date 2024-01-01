
async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        console.log(data) ;
    } catch (error) {
        
    }
}