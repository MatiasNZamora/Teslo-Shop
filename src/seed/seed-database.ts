import { initialData } from "./seed";
import {prisma} from '../lib/prisma';

async function main(){


    // Borrar reguistros previos
    await Promise.all([
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
    ])

    const { categories, products } = initialData;

    // Categorias
    const categoriesData = categories.map( category => ({ name: category }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( ( map, category ) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); // <string> = shirt, string=categoryID

    // Productos

    products.forEach( async (product) => {
        const { type, images, ...rest } = product;

        const dbproduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Imagenes 
        const imagesData = images.map( image => ({
            url: image,
            productId: dbproduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

    });

    
    console.log('Seed Executed');
};

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main()
})();