import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IProduct, ICategory } from '@/types/types';
import PriceTag from '@/components/priceTag';
import ShareMenu from './shareMenu';

type TProductCard = {
  product: IProduct,
  selectedProductsCategory: ICategory,
  newLimit: () => void,
  isLast: boolean,
  key: string,
}

function ProductCard({
  product,
  selectedProductsCategory,
  newLimit,
  isLast,
  key
}: TProductCard) {

  const [shareMenuOpen, setShareMenuOpen] = useState(false);

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
  }, [isLast, newLimit]);

  const productLink = `https://web.furrl.in/productDetail?productId=${product.id}&id=${product.id}&brand=${product.brandName}&name=${product.title}`

  return (product.furrlProductCategoryIds.includes(selectedProductsCategory.id) && <div
    className={`
    px-2 py-4 text-sm
    w-1/2
    nth-[3n+3]:w-full
    h-96
    `}
    ref={cardRef}
    key={key}
  >
    <a
      href={productLink}
    >
      <div className="relative h-64">

        <img
          className="w-full h-64 object-cover rounded-md"
          src={product.image}
          alt={product.title}
        />
        <div className="
          absolute bottom-3 right-4
          bg-slate-200 hover:bg-slate-800
          rounded-lg"
        >
          <ShareMenu
            productName={product.title}
            link={productLink}
            shareMenuOpen={shareMenuOpen}
            setShareMenuOpen={setShareMenuOpen}
          />
          <a
            href="#"
            onClick={() => setShareMenuOpen(true)}
          >
            <Image
              alt="share"
              src="/images/share-icon-svg-27.png"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </a>
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
