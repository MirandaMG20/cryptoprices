import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Price() {
  const apiKey = "3477A8DA-A17F-48A2-8B54-0E4015A6966B";
  const params = useParams();
  const symbol = params.symbol;
  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const [coin, setCoin] = useState(null);

    //function to fetch coin data 
    const getCoin = async () => {
      try{
        const response = await fetch(url);
        const data = await response.json();
        setCoin(data);
      } catch(error){
        console.log(error)
      }
    };

  useEffect(() => {
    getCoin();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>
          {" "}
          {coin.asset_id_base} / {coin.asset_id_quote}
        </h1>
        <h2> {coin.rate}</h2>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return coin && coin.rate ? loaded() : loading();
}

export default Price;
