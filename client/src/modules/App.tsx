import { RootRouter } from '#/modules/RootRouting/RootRouting';
import * as React from 'react';
import axios from 'axios';

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
