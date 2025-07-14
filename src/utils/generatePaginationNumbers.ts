
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    //vamos a mostrar todas las paginas si son menos de 7
    if(totalPages <= 7) {
        return Array.from( { length: totalPages }, (_, i) => i + 1 );
    }

    // si la pagina actual esta dentro de las primeras 3 paginas, poner puntos suspencivos y poner las ultimas 2
    if(currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // si la pagina actual esta dentro de las ultimas 3 paginas
    if(currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    
    // si la pagina actual esta en otro lugar 
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
