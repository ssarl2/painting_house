import React, { useState } from 'react';
import axios from 'axios';

const GetImage = () => {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleGetImage = () => {
    const url = `http://localhost:3001/files`; // Adjust the URL to match your backend API endpoint
    console.log(`retrieving image: ${url}`);
    axios.get(url)
      .then((response) => {
        setImageUrl('dd');
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

          <img src='http://localhost:3001/files' alt="Retrieved" style={{ width: '100%' }} />
        </div>
      ) : (
        <p>No image retrieved.</p>
      )}
    </div>
  );
};

export default GetImage;