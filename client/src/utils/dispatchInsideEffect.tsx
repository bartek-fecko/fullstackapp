import * as React from 'react';

const dispatchInsideEffect = (actionCreatrorResult, dispatch) => {
   React.useEffect(() => {
      dispatch(actionCreatrorResult);
   }, []);
};

export default dispatchInsideEffect;
