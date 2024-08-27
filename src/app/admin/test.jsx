import React, { useState, useEffect } from 'react';

const ImageViewer = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:5000/news/get');

        if (!response.ok) {
          throw new Error('Image not found');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('Failed to load image.');
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Fetched from backend" />
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
};

export default ImageViewer;
