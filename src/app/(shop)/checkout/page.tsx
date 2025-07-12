import { QuantitySelector, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">

            <div className="flex flex-col w-[1000px]">
                
                <Title title='Verificar Orden' className={ titleFont.className } />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
                    
                    {/* cart  */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl"> Modificar Orden </span>
                        <Link href="/cart" className="underline mb-5" >
                            Editar Carrito
                        </Link>
                    
                        {/* Itmes */}
                        {
                            productsInCart.map( product => (
                                <div key={ product.slug } className="flex mb-5">
                                    <Image 
                                        src={ `/products/${product.images[0]}` }
                                        width={100}
                                        height={100}
                                        style={{
                                            width:'100px',
                                            height: '100px'
                                        }}
                                        alt={product.title}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3 </p>
                                        <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                                        <button className="underline mt-3">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* checkut - */}
                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mt-2 font-bold"> Dirección de entrega </h2>
                        <div className="mb-10">
                            <p className="text-xl">Matias N Zamora</p>
                            <p>La Rioja Capital</p>
                            <p>CP: 5300</p>
                            <p>Chubut 690</p>
                            <p>Tel: 123123</p>
                        </div>

                        {/* divisor  */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" /> 
                        
                        <h2 className="text-2xl mb-2"> Resumen de orden </h2>
                        <div className="grid grid-cols-2">

                            <span>No. Productos</span>
                            <span className="text-right"> 3 </span>

                            <span>Subtotal</span>
                            <span className="text-right"> $ 100,00 </span>
                            
                            <span>Impuestos (21%)</span>
                            <span className="text-right"> $ 21,00 </span>

                            <span className="text-2xl mt-5">Total: </span>
                            <span className="text-right text-2xl mt-5"> $ 121,00 </span>

                        </div>

                        <div className="mt-5 mb-2 w-full">

                            <p className="mb-5">
                                {/* disclaimer */}
                                <span className="text-xs">
                                    Al hacer click en "Crear orden", aceptas nuestros <a href="#" className="underline">términos, condiciones de uso</a> y <a href="#" className="underline">politicas de privacidad</a>
                                </span>
                            </p>


                            <Link className="flex btn-primary justify-center" href="/orders/123">
                                Crear Orden
                            </Link>
                        </div>

                    </div>
                </div>  
            </div>
        </div>
    );
}