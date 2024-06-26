export const bufferToImage = (buffer) => {
  if (!buffer || buffer.byteLength === 0) {
    throw new Error('Invalid input buffer');
  }
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:image/png;base64,${base64}`;
};

export const getUserLocation = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
        )
          .then((response) => response.json())
          .then((data) => {
            const country = data.address.country;
            const city = data.address.city;
            resolve({ country, city });
          })
          .catch((error) => reject(error));
      }, reject);
    });
  } else {
    return Promise.reject(
      new Error('Geolocation is not supported by this browser')
    );
  }
};
