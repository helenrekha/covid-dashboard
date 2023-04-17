import './App.css';
import Select from "react-select";
import { useEffect, useState } from 'react';
import locationList from './LocationList';
import Card from './Card.js';
function App() {
  const[activeLocation,setactiveLocation]=useState("AB");
  const[lastUpdated,setlastUpdated]=useState("");
  const [summaryData, setSummaryData] = useState({});
const baseUrl="https://api.opencovid.ca";

useEffect(()=>{
  getSummaryData();
  getVersion();
},[activeLocation]);

const getVersion=async()=>{
  const res=await fetch(`${baseUrl}/version`);
  const data=await res.json();
  setlastUpdated(data.timeseries);
};

const getSummaryData=async(location)=>{
  console.log(location);
  if(activeLocation==='canada')
  {
    return;
  }
  let res=await fetch(`${baseUrl}/summary?loc=${activeLocation}`);
  let resdata=await res.json();

  let summaryData=resdata.data[0];//only 0th position has information
  let formattedData={};
  let values=Object.keys(summaryData);//gives values of summaryData as an array
  console.log(values);
  values.map((key)=>(formattedData[key]=summaryData[key].toLocaleString()));//(which in this case adds commas to the hundreds and thousands position).
  console.log(formattedData);
  setSummaryData(formattedData);
};


  return (
    <div className="App">
     <h1>COVID dashboard Summary</h1>
     <div className='dashboard-container'>
      <div className='dashboard-menu'>
        <Select options={locationList} onChange={(selectedoption)=>setactiveLocation(selectedoption.value)} defaultValue={locationList.filter((options)=>options.value===activeLocation)} className="dashboard-select"/>
        <p className="update-date">Last Updated {lastUpdated}  </p>
      </div>
      <div className='dashboard-summary'>
        <Card title="Total Cases" value={summaryData.cases}/>
     <Card title="Total Tests" value={summaryData.tests_completed} />
<Card title="Total Deaths" value={summaryData.deaths}/>
<Card title="Total Vaccinated" value={summaryData.vaccine_administration_total_doses}/> 
      </div>
     </div>
    </div>
  );
}

export default App;
