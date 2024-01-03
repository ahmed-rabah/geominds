

export  async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
       setTimeout(()=>{alert('Countries')
       return data ;},2000) ; 
        
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

export function countries(){
    let data  = getCountries() ; 
    return data ; 
}

