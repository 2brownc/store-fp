interface ICategory {
  id: string,
  name: string
}

interface IProduct {
  id: string,
  productId: number,
  compare_at_price: number,
  price: number,
  title: string,
  image: string,
  brandName: string,
  furrlDiscountPercent: number,
  furrlProductCategoryId: string
}

export type { ICategory, IProduct };