import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { CoinDetails } from "./components/CoinDetails";
import { Graph } from "./components/Graph";
import "./styles/home.css";

type DetailsExchangeProps = {
    code: String,
    description: String,
    rate: String,
    rate_float: Number
    symbol: String,
}

type BpiProps = {
    EUR: DetailsExchangeProps,
    GBP: DetailsExchangeProps,
    USD: DetailsExchangeProps,
}

type TimeProps = {
    updated: String,
    updatedISO: String,
    updateduk: String,
}

type AllInfoCoinProps = {
    chartName: String,
    disclaimer: String,
    bpi: BpiProps,
    time: TimeProps,
}

export function Home() {

    const [infoCoin, setInfoCoin] = useState<AllInfoCoinProps>();
    const [labelsGraph, setLabelsGraph] = useState<String[]>()
    const [dataGraph, setDataGraph] = useState<Number[]>()


    const loadDataCoin = async () => {
        try {
            await api.get('/v1/bpi/currentprice.json').then((res) => {
                setInfoCoin(res.data);

            }).catch((err) => {
                console.log("nao foi possivel pegar o valor:", err);
            })

            await api.get('https://api.coindesk.com/v1/bpi/historical/close.json').then((res) => {
                handleChangeDataHistoryCoin(res.data.bpi);
            })

        } catch (error) {
            throw new Error('error');
        }
    }

    const handleChangeDataHistoryCoin = (bpi: Object) => {
        const dates = Object.keys(bpi);
        const valuesDates = Object.values(bpi);
        const auxLabels = [];
        const auxData = [];


        for (let i = dates.length - 7; i < dates.length; i++) {
            auxLabels.push(dates[i]);
            auxData.push(valuesDates[i]);
            console.log(valuesDates[i]);
        }

        setLabelsGraph(auxLabels);
        setDataGraph(auxData);
    }

    useEffect(() => {
        loadDataCoin();
    }, []);

    return (
        <div className="container-home">

            <header>
                <h1>{infoCoin?.chartName}</h1>
            </header>

            <div className="coins">
                <CoinDetails title='Dolar' coin={infoCoin?.bpi.USD} />
                <CoinDetails title='Libra Esterlina' coin={infoCoin?.bpi.GBP} />
                <CoinDetails title='Euro' coin={infoCoin?.bpi.EUR} />

                <div className="container-graph">

                    {labelsGraph?.length !== 0 ? <Graph dataGraph={dataGraph} labelsGraph={labelsGraph} /> : <p>Carregando graifco...</p>}


                </div>

            </div>


        </div>
    )
}