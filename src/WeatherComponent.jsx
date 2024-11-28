import { useState, useEffect } from "react";

// 定数URLの管理
const WEATHER_API_URL = [
  "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json",
  "https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json",
  "https://www.jma.go.jp/bosai/forecast/data/forecast/016000.json",
  "https://www.jma.go.jp/bosai/forecast/data/forecast/260000.json",
  "https://www.jma.go.jp/bosai/forecast/data/forecast/020000.json",
  "https://www.jma.go.jp/bosai/forecast/data/forecast/030000.json",
];

// エラーハンドリングの共通関数
const handleError = (error) => {
  console.error("Error:", error);
  return "データの取得に失敗しました";
};

// データ取得の非同期関数
const fetchWeatherData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};
//日付の表示をx月x日に書き換える
const changeFormat = (x) => {
  const date = new Date(x);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
};
const areas = ["東京地方", "大阪府", "石狩地方", "北部", "津軽", "沿岸北部"];
const temAreas = ["東京", "大阪", "札幌", "京都", "青森", "盛岡"];
const WeatherComponent = () => {
  const [data, setData] = useState({
    date: [],
    weather: [],
    wave: [],
    temps: [],
    tempsFuture: [[], []],
    error: null,
  });
  const [city, select] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      //useEffect内に非同期に天気データを取得してくる関数を定義
      try {
        const weatherData = await fetchWeatherData(WEATHER_API_URL[city]);
        const cityWeather = weatherData[0].timeSeries[0].areas.find(
          (area) => area.area.name === areas[city]
        );
        const cityTemperatures = weatherData[0].timeSeries[2].areas.find(
          (area) => area.area.name === temAreas[city]
        );
        const cityFuture = weatherData[1].timeSeries[1].areas.find(
          (area) => area.area.name === temAreas[city]
        );
        console.log(cityTemperatures);
        console.log(cityFuture);
        const dateToday = weatherData[0].timeSeries[0].timeDefines;
        const showDates = dateToday.map((x) => changeFormat(x));
        console.log("Tokyo Weather:", cityWeather);
        console.log("datetoday:", dateToday);
        console.log("showDates:", showDates);

        setData({
          date: showDates,
          temps: cityTemperatures.temps,
          weather: [
            cityWeather.weathers[0],
            cityWeather.weathers[1],
            cityWeather.weathers[2],
          ],
          tempsFuture: [cityFuture.tempsMax, cityFuture.tempsMin],
          wave: [
            cityWeather.waves[0],
            cityWeather.waves[1],
            cityWeather.waves[2],
          ],
          error: null,
        }); //成功時はuseStateフックを使って天気データを保存
      } catch (error) {
        setData({ weather: null, wave: null, error: handleError(error) }); //失敗時はエラーメッセージを表示
      }
    };
    fetchData(); //fetchData()を実行する
  }, [city]); //useEffectの依存配列なのでマウント時に実行される
  return (
    <>
      <div
        style={{
          width: "60vw",
          marginLeft: "20vw",
          padding: "20px",
          border: "5px double pink",
          backgroundImage:
            "url('https://drive.google.com/thumbnail?id=14xDQ1z41bOJZzbFhk6gdBruE-fFkPeu0')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 style={{ textAlign: "center" }}> 天気予報</h1>
        <label
          style={{
            fontSize: 28,

            paddingLeft: 25,
            paddingRight: 25,
          }}
          htmlFor="aff-select"
        >
          都道府県選択：
        </label>
        <select
          name="aff-select"
          id="affselect"
          style={{
            fontSize: 28,
            border: "2px double brown",
            paddingLeft: 25,
            paddingRight: 25,
          }}
          onChange={(x) => select((city) => (city = x.target.value))}
        >
          <option value="0">東京</option>
          <option value="1">大阪</option>
          <option value="2">札幌</option>
          <option value="3">京都</option>
          <option value="4">青森</option>
          <option value="5">岩手</option>
        </select>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            marginTop: "50px",
            fontSize: "16px",
          }}
        >
          {
            <div
              style={{
                marginBottom: 28,
                gridColumn: "1/3",
                margin: "0 auto",
              }}
            >
              <p>今日:{data.date[0]}</p>
              <p>天気: {data.weather[0]}</p>
              <p>気温:~{data.temps[1]}</p>
              <p>風速: {data.wave[0]}</p>
            </div>
          }
          {
            <div
              style={{
                marginBottom: 28,
              }}
            >
              <p>明日:{data.date[1]}</p>
              <p>天気: {data.weather[1]}</p>
              <p>
                気温:{data.temps[2]}~{data.temps[3]}
              </p>
              <p>風速: {data.wave[1]}</p>
            </div>
          }
          {
            <div
              style={{
                margin: "0 auto",
              }}
            >
              <p>
                明後日:
                {data.date[2] ||
                  (() => {
                    if (data.date[1]) {
                      const date = new Date(
                        data.date[1].replace("月", "/").replace("日", "")
                      );
                      date.setDate(date.getDate() + 1);
                      return `${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                  })()}
              </p>
              <p>天気: {data.weather[2] || "情報なし"}</p>
              <p>
                気温:{data.tempsFuture[1][1]}~{data.tempsFuture[0][1]}
              </p>
              <p>風速: {data.wave[2] || "情報なし"}</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default WeatherComponent;
