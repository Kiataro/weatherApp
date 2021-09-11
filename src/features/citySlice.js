import { createSlice } from "@reduxjs/toolkit";
const localStArr = JSON.parse(localStorage.getItem('reduxState'));
if(localStArr != null) {
    var a = localStArr.cities.cityList;
} else {
    a = [];
}
const initialState = {
    cityList: a
}
const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        saveCity: (state, action) => {
            state.cityList.push(action.payload)
        }
    }
});

export const { saveCity } = citySlice.actions

export const selectCityList = state => state.cities.cityList

export default citySlice.reducer