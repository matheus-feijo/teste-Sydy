import { Fragment } from "react"

type DetailsExchangeProps = {
    code: String,
    description: String,
    rate: String,
    rate_float: Number
    symbol: String,
}


type CoinDetailsProps = {
    title: string,
    coin: DetailsExchangeProps | undefined
}

export function CoinDetails({ title, coin }: CoinDetailsProps) {

    return (
        <Fragment>
            <p>{`${title} = ${coin?.rate}`}</p>
        </Fragment>
    )
}