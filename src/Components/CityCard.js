import React from "react";
import { Card } from '@shopify/polaris';
import './CityCard.css';
const CityCard = ({name, weather}) => {
    return (


            <Card key='name' title={name} sectioned>
                <div className="flex">
                    <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
                    <p key='weather'>{weather['main']['temp']}</p>
                </div>
            </Card>

    )
}

export default CityCard