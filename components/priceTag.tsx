import React from 'react';

type TPriceTag = {
  price: number,
  compare_at_price: number,
  furrlDiscountPercent: number
}

function PriceTag({
  price,
  compare_at_price,
  furrlDiscountPercent,
}: TPriceTag) {
  return <div className="flex flex-row gap-1">
    <div>{`Rs. ${price}`}</div>
    {compare_at_price && compare_at_price != price && <div className="line-through">{`Rs. ${compare_at_price}`}</div>}
    {furrlDiscountPercent > 0 && <div className="text-violet-400">{`${furrlDiscountPercent}%`}</div>}
  </div>
}

export default PriceTag;