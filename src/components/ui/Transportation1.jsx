import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const carIcon = "/icon/car_20x20.svg";
const trainIcon = "/icon/train_20x20.svg";
const walkIcon = "/icon/walk_20x20.svg";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Transportation = ({ type, origin, destination }) => {
  const [estimates, setEstimates] = useState(null);
  const [error, setError] = useState(null);
  const [eta, setEta] = useState('');
  const [results, setResults] = useState(null);


  /*
  const fetchEstimates = async () => {
    if (!origin || !destination) return;

    try {
      const response = await fetch(
        `/api/get-distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
      );
      const data = await response.json();
      if (response.ok) {
        setEstimates(data);
        setError(null);
      } else {
        setError(data.error);
        setEstimates(null);
      }
    } catch (err) {
      setError('?');
      setEstimates(null);
      console.log(err);
    }
  };
*/

const fetchEstimates = async () => {
  const origins = ["52.5160,13.3779"];  // Origin coordinates (Berlin)
  const destinations = ["48.8566,2.3522"];  // Destination coordinates (Paris)

  const url = `/api/distance-matrix?origins=${origins.join(";")}&destinations=${destinations.join(";")}`;

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    setResults(data);
  } else {
    console.error("Error fetching distance matrix");
  }
};

  useEffect(() => {
    fetchEstimates();
  }, [origin, destination]);

  useEffect(() => {
    if (estimates) {
      switch (type) {
        case 'car':
          setEta(estimates.car);
          break;
        case 'train':
          setEta(estimates.train);
          break;
        case 'walk':
          setEta(estimates.walk);
          break;
        default:
          setEta('');
      }
    }
  }, [estimates, type]);

  let src = '';
  switch (type) {
    case 'car':
      src = carIcon;
      break;
    case 'train':
      src = trainIcon;
      break;
    case 'walk':
      src = walkIcon;
      break;
    default:
      return null;
  }

  return (
    <>
      <h1>{results}</h1>
      <div className="flex flex-col items-center gap-1 w-[3rem]">
        <Image src={src} alt={capitalize(type)} width={20} height={20} style={{ width: '1.25rem' }}/>
        {estimates && <p>{`${eta}`}</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Transportation;