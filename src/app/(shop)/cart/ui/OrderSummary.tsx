'use client';

import { useEffect, useState } from "react";
import { useCartStore } from "../../../../store";
import { currencyFormat } from "../../../../utils";


const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const itemsInCart = useCartStore(state => state.getSummaryInformation().itemsInCart);
    const subTotal = useCartStore(state => state.getSummaryInformation().subTotal);
    const tax = useCartStore(state => state.getSummaryInformation().tax);
    const total = useCartStore(state => state.getSummaryInformation().total);

    useEffect(() => {
        setLoaded(true);
    },[]);

    if (!loaded) return <p>Cargando...</p>;

    return (
        <>
            <span>No. Productos</span>
            <span className="text-right"> { itemsInCart  === 1 ? '1 producto' : `${itemsInCart} productos` } </span>

            <span>Subtotal</span>
            <span className="text-right"> { currencyFormat(subTotal) } </span>

            <span>Inpuestos (21%)</span>
            <span className="text-right"> { currencyFormat(tax) } </span>

            <span className="text-2xl mt-5">Total: </span>
            <span className="text-right text-2xl mt-5"> { currencyFormat(total) } </span>
        </>
    );
};

export default OrderSummary;
