import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { Map, Icon } from 'leaflet';
import { Btn, IconBtn, Input } from 'components/uiKit/UiKIt';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiMapPin } from 'react-icons/bi';
import mapFiltersService from 'services/mapServices/mapFiltersServices';
import MapMarker from './MapMarker';

const MapPage = (props) => {
  const [position, setPosition] = useState({
    latitude: 32.109333,
    longitude: 34.855499
  });
  const [map, setMap] = useState();
  const [posts, setPosts] = useState([]);

  const [filterStyle, setFilterStyle] = useState({
    width: '0px'
  });
  const [btnFilterStyle, setBtnFilterStyle] = useState({});
  const [flag, setFlag] = useState(false);

  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [radius, setRadius] = useState(0);
  const [tags, setTags] = useState('');
  const [friendGroup, setFriendGroup] = useState('');

  useEffect(() => {
    goHome();
  }, []);

  useEffect(() => {
    if (position)
      map?.flyTo({ lat: position.latitude, lng: position.longitude }, 17);
  }, [position]);

  const goHome = () => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;

        setPosition({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const setFilters = async () => {
    const filters = {
      user_id: props.user._id,
      position: position,
      dateFrom: dateFrom,
      dateTo: dateTo,
      radius: radius,
      tags: tags,
      friendGroup: friendGroup
    };

    const result = await mapFiltersService(filters);
    console.log(result);
    setPosts(result);
  };

  const filtersMenu = () => {
    if (!flag) {
      setBtnFilterStyle({
        transform: 'rotate(90deg)'
      });
      setFilterStyle({
        width: '400px'
      });
    } else {
      setBtnFilterStyle({
        transform: 'rotate(0deg)'
      });
      setFilterStyle({
        width: '0px'
      });
    }
    setFlag(!flag);
  };

  return (
    <div className="map">
      <div className="map__filters" style={filterStyle}>
        <div className="map__filters__container">
          <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
          <input type="date" onChange={(e) => setDateTo(e.target.value)} />
          <input
            type="number"
            placeholder="radius"
            onChange={(e) => setRadius(e.target.value)}
          />
          <input
            type="text"
            placeholder="tags"
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="text"
            placeholder="friend Group"
            onChange={(e) => setFriendGroup(e.target.value)}
          />
          <IconBtn
            icon={AiOutlineSearch}
            className="map__filters__container__btn transparent"
            onClick={setFilters}
          />
        </div>
      </div>
      <div>
        <IconBtn
          className="map__btn__filters blue"
          style={btnFilterStyle}
          icon={BiMapPin}
          onClick={filtersMenu}
        ></IconBtn>
        <IconBtn
          className="map__btn__filters blue"
          icon={AiOutlineHome}
          onClick={goHome}
        ></IconBtn>
      </div>
      <MapContainer
        whenCreated={setMap}
        className="map__container"
        center={[32.109333, 34.855499]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((post) => {
          return <MapMarker post={post} />;
        })}
        <Circle
          center={[position.latitude, position.longitude]}
          radius={radius}
        />
      </MapContainer>
    </div>
  );
};

export default MapPage;
