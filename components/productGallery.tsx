import React from 'react';
import { IProduct, ICategory } from '@/types/types';
import ProductCard from '@/components/productCard';

type TProductGallery = {
  products: IProduct[],
  selectedProductsCategory: ICategory,
  currentTotalProducts: number,
  page: number,
  setPage: (value: number) => void
}

function ProductGallery({
  products,
  selectedProductsCategory,
  currentTotalProducts,
  page,
  setPage,
}: TProductGallery) {
  if (!products) return <></>

  return products.map((product: IProduct, key: number) => <ProductCard
    key={product.id}
    product={product}
    selectedProductsCategory={selectedProductsCategory}
    isLast={key === currentTotalProducts}
    newLimit={() => setPage(page + 1)}
  />)
}

export default ProductGallery;