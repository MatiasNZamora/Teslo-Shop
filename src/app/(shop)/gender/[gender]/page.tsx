export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
// import { Category, Product } from "@/interfaces";
// import { initialData } from "@/seed/seed";


interface Props {
  params: Promise<{
    gender: string;
  }>
  searchParams: Promise<{
    page?: string;
  }>
};

export default async function GenderPage({ params, searchParams }: Props) {

  const { gender } = await params;

  // Corregido: primero esperamos a searchParams y luego accedemos a page
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender:gender as Gender });

  if(products.length === 0) {
    redirect(`/gender/${gender}`);
  };


  const labels: Record<string, string>= {
    'men':'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  };

  // if(id === 'kids'){
  //     notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos de ${ labels[gender as string] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={ products } 
      />
      
      <Pagination totalPages={ totalPages } /> 
    </>
  );
}