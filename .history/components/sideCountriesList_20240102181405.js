

export  async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        console.log(data[100]);
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

export function countriesSearchList(list){
   return list.then((countries) => {
        let htmlSearchList = `` ; 
        countries.forEach(({name,flags}) => {
            htmlSearchList += `
                <div className="flex">
                    <img src="${glags.svg}" alt="${flags.alt}" className="country-icon-img" />
                    <h4 className="country-name" data-country-name="${flags.common}">${name.official}</h4>
                </div>
            `;
        })
        return htmlSearchList ; 
    })
}

