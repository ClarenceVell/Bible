import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';


const Loader = () => (
  <div style={{width:'100%', display: 'flex', justifyContent:"center", alignItems:"center" }}>
    <InfinitySpin width={'200px'} color='grey' />
  </div>
);

export default Loader;