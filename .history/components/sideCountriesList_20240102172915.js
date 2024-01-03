

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

export async function countries(){
    let data  = await getCountries() ; 
    return data ; 
}

