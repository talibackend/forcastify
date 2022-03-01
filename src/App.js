import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Main from './components/mainBody';
import {React, useState, useEffect} from 'react';
import iconList from './static/iconList';

function App() {
  const [typed, changeTyped] = useState("");
  const [loadedData, updateLoadedData] = useState({});
  const [loadedList, updateLoadedList] = useState([]);
  const [loading, updateLoadingState] = useState(false);
  const [lastSearched, updateLastSearched] = useState("");
  const authKey = "5381bbe28eaf4ff693c125043222702";
  const baseUrl = "http://api.weatherapi.com/v1/forecast.json";


  const formatDate = (string)=>{
    var split_string = string.split("-");
    var year = split_string[0];
    var month = parseInt(split_string[1]);
    var day = split_string[2];
    var months = ['January', 'February', 'March', 'April', 
                'May', 'June', 'July', 'August', 'September', 
                'October', 'November', 'December'];
    var selectedMonth = months[month - 1];
    return `${selectedMonth} ${day}, ${year}`;
  }
  const retrieveIcon = (key)=>{
    let count = iconList.length;
    for(let i = 0; i < count; i++){
      let currentIcon = iconList[i];
      if(currentIcon.code == key){
        return `icons/${currentIcon.icon}.png`;
      }
    }
  }
    
  const changeCurrent = (date)=>{
    let length = loadedList.length;
    let newCurrent = {};
    let newList = [];
    for(let i = 0; i < length; i++){
      if(loadedList[i].date == date){
        newCurrent = loadedList[i];
        loadedList[i].active = 1;
        newList.push(loadedList[i]);
      }else{
        loadedList[i].active = 0;
        newList.push(loadedList[i]);
      }
    }
    updateLoadedData(newCurrent);
    updateLoadedList(newList);
  }

  const search = ()=>{
    if(typed != lastSearched){
      updateLoadingState(true)
      fetch(`${baseUrl}?key=${authKey}&q=${typed}&days=6`).then((res)=>{
        res.json().then((json)=>{
          updateLastSearched(typed);
          let firstData = {
            date : formatDate(json.forecast.forecastday[0].date),
            city : typed,
            condition : json.forecast.forecastday[0].day.condition.text,
            max_tmp : json.forecast.forecastday[0].day.maxtemp_c,
            min_tmp : json.forecast.forecastday[0].day.mintemp_c,
            icon : retrieveIcon(json.forecast.forecastday[0].day.condition.code)
          };
  
          let allList = [];
  
          json.forecast.forecastday.forEach((day)=>{
            let active = 0;
            if(day.date == json.forecast.forecastday[0].date){
              active = 1;
            }
            let newDay = {
              date : formatDate(day.date),
              city : typed,
              condition : day.day.condition.text,
              max_tmp : day.day.maxtemp_c,
              min_tmp : day.day.mintemp_c,
              icon : retrieveIcon(day.day.condition.code),
              active : active
            };
            allList.push(newDay);
          });
          
          updateLoadedData(firstData);
          updateLoadedList(allList);
          updateLoadingState(false)
  
        }
        ).catch((err)=>{
          updateLoadedData({});
          updateLoadedList([]);
          updateLoadingState(false)
        })
      }).catch((err)=>{
        updateLoadedData({});
        updateLoadedList([]);
        updateLoadingState(false)
      })
    }else{
      alert("Please search for another city.");
    }
  }
  // useEffect(()=>{
  //   console.log(loadedList);
  //   console.log(loadedData);
  // })

  return (
    <>
      <Header changeTyped={changeTyped} search={search} typed={typed} />
      <Main loadedData={loadedData} changeCurrent={changeCurrent} loadedList={loadedList} loading={loading} city={typed} />
    </>
  );
}

export default App;
