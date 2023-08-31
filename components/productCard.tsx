import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { IProduct, ICategory } from '@/types/types';
import PriceTag from '@/components/priceTag';

type TProductCard = {
  product: IProduct,
  selectedProductsCategory: ICategory,
  newLimit: () => void,
  isLast: boolean,
}

function ProductCard({
  product,
  selectedProductsCategory,
  newLimit,
  isLast,
}: TProductCard) {

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (product.furrlProductCategoryIds.includes(selectedProductsCategory.id) && <div
    className={`
    px-2 py-4 text-sm
    w-1/2
    nth-[3n+3]:w-full
    h-96
    `}
    ref={cardRef}
    key={product.id}
  >
    <img
      className="w-full h-5/6 object-cover rounded-md"
      src={product.image}
      alt={product.title}
    />
    <div className="
          px-1  
        ">
      <div className="">
        {product.brandName}
      </div>
      <div className="truncate font-bold">
        {product.title}
      </div>
      <div>
        <PriceTag {...product} />
      </div>
    </div>
  </div>
  )
}

export default ProductCard;
