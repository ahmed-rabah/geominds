

export  async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        console.log(data[100]);
        console.log(data[200]);
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

export function countriesSearchList(list){
    list.then((countries) => {
        countries.forEach(({name}) => {
            // console.log(name) ;

        })
    })
}

