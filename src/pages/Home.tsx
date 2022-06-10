import { MouseEvent, useEffect, useState } from "react";
import { api } from "../services/api";

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


    const handleChange = async (e: MouseEvent) => {
        e.preventDefault();

        console.log(infoCoin?.bpi)
    }

    const loadDataCoin = async () => {
        try {
            await api.get('/v1/bpi/currentprice.json').then((res) => {
                console.log(res);
                setInfoCoin(res.data);
            }).catch((err) => {
                console.log("nao foi possivel pegar o valor:", err);
            })

        } catch (error) {
            throw new Error('error');
        }
    }

    useEffect(() => {
        loadDataCoin();

    }, [])

    return (
        <div>
            <h1>{infoCoin?.chartName}</h1>
            <p>{infoCoin?.disclaimer}</p>

            <div>
                <button onClick={handleChange}>TESTE</button>

            </div>
        </div>
    )
}