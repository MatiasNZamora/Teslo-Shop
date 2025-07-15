'use client';
import { useEffect, useState } from 'react';
import { titleFont } from "../../../config/fonts"
import { getStockBySlug } from "../../../actions";

interface Props {
    slug: string;
};

export const StockLabel = ({ slug }: Props) => {


    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    },[])

    const getStock = async () => {
        const inStock = await getStockBySlug(slug);
        
        setStock(Number(inStock));
        setIsLoading(false);
    }
    

    return (
        <>
        {
            isLoading ? (
                <h6 className={`${titleFont.className} antialiased font-bold bg-gray-200 animate-pulse`}>
                    &nbsp;
                </h6>
            ) : (
                <h6 className={`${titleFont.className} antialiased font-bold `}>
                    Stock: {stock}
                </h6>
            )
        }
        </>
    )
}
