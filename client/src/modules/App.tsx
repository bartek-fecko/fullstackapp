import { RootRouter } from '#/modules/RootRouting/RootRouting';
import axios from 'axios';
import * as React from 'react';

export const App: React.FC = () => {
   React.useEffect(() =>{
      axios.get('http://localhost:3000/api/posts').then(res => console.log(res))
   });
   return (
      <>
         <RootRouter />
      </>
   );
};
