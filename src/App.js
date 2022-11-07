import { useEffect, useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { BiWind } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import Loader from "./index.svg";

function App() {
  const [currentCity, setCurrentCity] = useState("");
  const [location, setLocation] = useState("London");
  const [weatherData, setWeatherData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${location}`
    );
    let parsedData = await data.json();
    setWeatherData(parsedData.current);
    setCurrentCity(parsedData.location);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="bg-slate-800 w-screen h-screen flex justify-center items-center">
      <div className="bg-slate-200 w-11/12 sm:w-1/2 md:w-3/4 lg:w-2/5 h-7/8 rounded-3xl shadow-xl p-5 px-2 sm:px-8 md:px-8 lg:px-8">
        <p className="font-mono text-3xl font-black text-center pb-6">
          Weather App
        </p>

        <div className="flex justify-center items-center gap-5 relative pb-2">
          <BiSearchAlt className="absolute left-5 text-3xl text-sky-600" />

          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setLocation(searchText);
            }}
            placeholder="Search your city"
            className="bg-slate-100 h-14 rounded-xl italic flex justify-center items-center w-full pl-5 text-xl font-bold text-slate-500 text-center placeholder-slate-500 shadow-md focus:border-2 focus:border-sky-400 focus:outline-sky-100 outline-offset-4"
          />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <img src={Loader} className="w-32" alt="" />
          </div>
        ) : currentCity?.name ? (
          <>
            <p className="text-center text-3xl font-black text-sky-500 font-mono">
              {currentCity?.name}
            </p>
            <div className="flex justify-center items-center pt-5">
              <div
                className="w-2/3 h-52 sm:w-1/2 sm:h-56 md:w-2/5 md:h-56 lg:w-1/2 rounded-full bg-slate-200 flex justify-center items-center shadow-lg transition-all hover:scale-110 hover:-hue-rotate-180"
                style={{
                  boxShadow:
                    "-2px -4px 4px 4px rgba(255, 255, 255, 0.5), 3px 6px 5px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className="rounded-full w-2/3 h-2/3 text-sky-500 bg-slate-200 flex justify-center items-center shadow-md p-3"
                  style={{
                    boxShadow:
                      "-2px -5px 4px 1px rgba(255, 255, 255, 0.6), 3px 6px 5px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CiTempHigh className="text-5xl" />

                  <div>
                    <p className="font-mono text-2xl flex justify-center items-center">
                      {weatherData?.temp_c}°C
                    </p>

                    <p className="font-mono text-2xl flex justify-center items-center">
                      {weatherData?.temp_f}°F
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-around items-center pt-4 lg:pt-6 gap-3">
              <div
                className="w-full sm:w-1/3 lg:w-1/3 bg-slate-200 flex justify-center items-center flex-col px-2 py-6 rounded-3xl transition-all hover:scale-110 hover:-hue-rotate-180"
                style={{ boxShadow: "0 3px 10px 5px rgba(0, 0, 0, 0.08)" }}
              >
                <img
                  src={weatherData?.condition?.icon}
                  className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <p className="text-lg font-bold text-sky-800">
                  {weatherData?.condition?.text}
                </p>
              </div>

              <div
                className="w-full sm:w-1/3 lg:w-1/3 bg-slate-200 flex justify-center items-center flex-col px-2 py-6 rounded-3xl transition-all hover:scale-110 hover:-hue-rotate-180"
                style={{ boxShadow: "0 3px 10px 5px rgba(0, 0, 0, 0.08)" }}
              >
                <BiWind className="w-10 h-10 sm:w-14 sm:h-14 text-blue-700" />
                <p className="text-lg font-bold text-sky-800">
                  {weatherData?.wind_kph} Km/h
                </p>
              </div>
            </div>
          </>
        ) : searchText !== "" ? (
          <p className="text-center text-3xl font-black text-sky-500 font-mono pt-10">
            No city found
          </p>
        ) : (
          setLoading(true)
        )}
      </div>
    </div>
  );
}

export default App;
