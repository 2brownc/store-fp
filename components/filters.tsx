import * as React from 'react';
import { ICategory } from '@/types/types';
import { clsx } from 'clsx';

function Filter(
  productCategories: ICategory[],
  selectedProductsCategory: ICategory,
  setSelectedProductsCategory: (value: ICategory) => void
): JSX.Element {
  if (!productCategories) return <></>;

  return <>
    <div className="flex gap-3 px-3 overflow-x-auto scrollbar-hide">
      {productCategories.map(productCategory => <div
        className={`
                border-solid border-2 rounded-3xl
                px-4 py-2
                ${clsx(selectedProductsCategory.name === productCategory.name && 'color-violet-500')}
              `}
        key={productCategory.id}
        onClick={() => setSelectedProductsCategory(productCategory)}
      >{`${productCategory.name}`}</div>)}
    </div>
  </>
}


export default Filter;