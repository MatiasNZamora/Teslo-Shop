import { ProductSlideShow, ProductMobileSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { Sizes } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        slug:string;
    }>;
};

export default async function ProductBySlugPage({ params }:Props) {

    const { slug } = await params;
    const product = initialData.products.find( product => product.slug === slug );

    if(!slug) notFound();

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            {/* slideshow movil */} 
            <ProductMobileSlideShow 
                title={ product?.title ?? '' }
                images={ product?.images ?? [] }
                className="block md:hidden"
            />

            {/* slideshow de escritorio */}
            <div className="col-span-1 md:col-span-2" >
                <ProductSlideShow 
                    title={ product?.title ?? '' }  
                    images={ product?.images ?? [] }
                    className="hidden md:block"
                />
            </div>

            {/* details  */}
            <div className="col-span-1 px-5">

                <h1 className={`${titleFont.className} antialiased font-bold text-3xl`}> { product?.title } </h1>
                <p className="text-lg mb-5">${ product?.price }</p>

                {/* selector de tallas  */}
                <SizeSelector 
                    selectedSize={ product?.sizes?.[0] as Sizes } 
                    availableSize={ product?.sizes ?? [] } 
                /> 
                
                {/* selector de cantidad  */}
                <QuantitySelector quantity={2} />
                {/* boton de cart  */}
                <button className="btn-primary my-5"> Agregar al carrito </button>

                {/* description  */}
                <h3 className="font-bold text-sm"> Descripciòn </h3>
                <p className="font-light"> { product?.description } </p>

            </div>

        </div>
    );
}