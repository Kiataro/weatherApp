import React, {useState, useCallback} from "react";

import {useDispatch} from "react-redux";
import {saveCity} from "../features/citySlice";
import { Icon } from '@shopify/polaris';
import {
    HeartMajor
} from '@shopify/polaris-icons';

import axios from 'axios';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

const Input = () => {
    const [input, setInput] = useState('');
    const [latLng, setLatLng] = useState('');
    const [weather, setWeather] = useState('');
    const [value, setValue] = useState('Jaded Pixel');

    const dispatch = useDispatch()


    const addCity = () => {
        dispatch(saveCity({
            item: input,
            weather: weather,
            id: Date.now()
        }))
    }
    const handleChange = useCallback((newValue) => setValue(newValue), []);
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLatLng(latLng);
        setInput(value);
        let lat = latLng['lat'];
        let lng = latLng['lng'];
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c471ebc55710eca17051f72c24becaee&units=metric`)
            .then(res => {
                setWeather(res.data);
            })
    };

    return (
        <div>
            <PlacesAutocomplete

                value={input}
                onChange={setInput}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="flex">
                        <input className="customInput" {...getInputProps({ placeholder: "Введите город..." })}  />
                        <button onClick={addCity}>
                            <Icon
                            source={HeartMajor}
                            color="critical" />
                        </button>
                        <div className="absolute">
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#EBF9FC" : "#fff",
                                    border: suggestion.active ? "1px solid #C8DFE3" : "1px solid transparent"
                                };
                                return (
                                    <div className="absoluteContainer" key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style})}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

        </div>
    )
}

export default Input