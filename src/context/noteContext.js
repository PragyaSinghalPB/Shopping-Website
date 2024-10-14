import { createContext, useState } from "react";

const NoteContext = createContext();

export function NoteProvider({children}){
        
    const [cart, setCart] = useState({ productArray : [] });
      
      return (

        <NoteContext.Provider value={{cart, setCart}}>
            {children}
        </NoteContext.Provider>

      );

}

export default NoteContext;

