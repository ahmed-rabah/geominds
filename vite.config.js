
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname , 'index.html') ,
        contact :   resolve(__dirname , 'contact.html') ,
        geoQuiz :   resolve(__dirname , 'geoQuiz.html') ,
        mapExplorer :   resolve(__dirname , 'mapExplorer.html') ,
        mapGuessing :   resolve(__dirname , 'mapGuessing.html') , 
      },
    },
 
    // copy: [
    //   {
    //     from: resolve(__dirname , 'public/countries'),
    //     to: 'countries',
    //   },
    //   {
    //     from: resolve(__dirname , 'public/LangCodeToEng'),
    //     to: 'LangCodeToEng',
    //   },
    // ],
    // assetsInclude: [
    //  resolve(__dirname , 'countries')  , 
    //  resolve(__dirname , 'LangCodeToEng')
    // ],
  },
})