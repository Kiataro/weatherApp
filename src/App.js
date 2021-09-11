import React, {useEffect, useState} from 'react';
import './App.css';
import Input from './Components/input';
import CityCard from './Components/CityCard';
import { Layout, Banner } from '@shopify/polaris';
import {useSelector} from "react-redux";
import {selectCityList} from "./features/citySlice";
import axios from "axios";

function App() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [cityName, setCityName] = useState("");
    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };
    const fetchWeather = async () => {
        try {
            await window.navigator.geolocation.getCurrentPosition(
                savePositionToState
            );
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c471ebc55710eca17051f72c24becaee&units=metric`
            );
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather(res.data.weather[0].main);
        } catch (err) {console.log(err)}
    };

    useEffect(() => {
        fetchWeather();
    }, [latitude, longitude]);

    let cityList = useSelector(selectCityList)

  return (
    <div className="App">
        <div className="mb">
            <Banner status="info">
                <p>

                    <div><b>Ваш город: </b> {cityName}</div>
                    <div>{temperature}ºC</div>
                </p>
            </Banner>
        </div>
        <div className="mb">
        <Layout>
            <Layout.Section oneHalf>
                {
                    cityList.map(item => (
                        <CityCard
                            key={item.id}
                            name={item.item}
                            weather={item.weather}
                        />

                    ))
                }
            </Layout.Section>
        </Layout>
        </div>
        <Input />
    </div>
  );
}

export default App;
