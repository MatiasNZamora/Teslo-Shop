export const revalidate = 60 * 60 * 144; // 14 days

import { ProductSlideShow, ProductMobileSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Sizes } from "@/interfaces";
import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../../actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    const slug = (await params).slug
    const product = await getProductBySlug(slug);

    return {
        title: (product?.title ?? 'Producto no encontrado'),
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images:[`/products/${product?.images[1]}`],
        }
    };
};


export default async function ProductBySlugPage({ params }: Props) {

    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!slug) notFound();

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            {/* slideshow movil */}
            <ProductMobileSlideShow
                title={product?.title ?? ''}
                images={product?.images ?? []}
                className="block md:hidden"
            />

            {/* slideshow de escritorio */}
            <div className="col-span-1 md:col-span-2" >
                <ProductSlideShow
                    title={product?.title ?? ''}
                    images={product?.images ?? []}
                    className="hidden md:block"
                />
            </div>

            {/* details  */}
            <div className="col-span-1 px-5">

                <StockLabel />

                <h1 className={`${titleFont.className} antialiased font-bold text-3xl`}> {product?.title} </h1>
                <p className="text-lg mb-5">${product?.price}</p>

                {/* selector de tallas  */}
                <SizeSelector
                    selectedSize={product?.sizes?.[0] as Sizes}
                    availableSize={product?.sizes ?? []}
                />

                {/* selector de cantidad  */}
                <QuantitySelector quantity={2} />
                {/* boton de cart  */}
                <button className="btn-primary my-5"> Agregar al carrito </button>

                {/* description  */}
                <h3 className="font-bold text-sm"> Descripciòn </h3>
                <p className="font-light"> {product?.description} </p>

            </div>

        </div>
    );
}