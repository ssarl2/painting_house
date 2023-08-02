import React, { useState } from 'react';
import axios from 'axios';

const GetImage = () => {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleGetImage = () => {
    const here = 'http://localhost:3001/files'
    console.log(`retrieving image : ${here}`)
    axios.get(here)
      .then((response) => {
        console.log(response.data)
        setImageUrl(response.data);
      })
      .catch((error) => {
        console.log('Error getting image:', error);
        setImageUrl('');
      });
  };

  return (
    <div>
      <input type="text" placeholder="Image Name" value={imageName} onChange={handleImageNameChange} />
      <button onClick={handleGetImage}>Get Image</button>

      {imageUrl ? (
        <div>
          <h2>Retrieved Image:</h2>
          <img src={imageUrl} alt="Retrieved" style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <p>No image retrieved.</p>
      )}
    </div>
  );
};

export default GetImage;