import React from 'react';
import { ICategory } from '@/types/types';
import { clsx } from 'clsx';

type TFilter = {
  productCategories: ICategory[] | null,
  selectedProductsCategory: ICategory,
  setSelectedProductsCategory: (value: ICategory) => void
}

function Filter({
  productCategories,
  selectedProductsCategory,
  setSelectedProductsCategory
}: TFilter) {
  if (!productCategories || !selectedProductsCategory) return <></>;

  return (
    <div className="flex gap-3 px-3 overflow-x-auto scrollbar-hide">
      {productCategories.map((productCategory: ICategory) => <div
        className={`
                border-solid border-2 rounded-3xl
                hover:border-black
                px-4 py-2
                whitespace-nowrap
                ${clsx(selectedProductsCategory.name === productCategory.name && 'bg-violet-500 text-white')}
              `}
        key={productCategory.id}
        onClick={() => setSelectedProductsCategory(productCategory)}
      >{`${productCategory.name}`}</div>)}
    </div>
  )
}


export default Filter;