import React from 'react';
import GeoMap from './Geolocation';
import Layout from './layout/Layout';
import UploadImages from './UploadImages';
import UploadVideos from './UploadVideos';


const App = () => {
  return (
    <Layout>
      <GeoMap />
      <UploadImages />
      <UploadVideos />
    </Layout>
  );
}

export default App;
