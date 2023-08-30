"use client";

import React, { useEffect, useState } from 'react';
import { ICategory, IProduct } from '@/types/types';

import Filters from '@/components/filters';
import TopMenu from '@/components/topMenu';
import VibeImage from '@/components/vibeImage';

export default function Home() {
  // set the vibe
  const vibe = "#NightFlea";

  // api
  const visitAPI = "https://api.furrl.in/api/v1/visit/create";
  const visitAPIBody = {
    completeUrl: "{vibe: NightFlea}",
    deviceId: ""
  };

  const vibeAPI = "https://api.furrl.in/api/v1/vibe/getVibeRelate";
  const vibeAPIBody = { vibe }

  const allProductCategory: ICategory = {
    name: "All",
    id: "0"
  };

  // state
  const [products, setProducts] = useState<any>([]);

  const [productCategories, setProductCategories] = useState<ICategory[] | null>(null);
  const [selectedProductsCategory, setSelectedProductsCategory] = useState<ICategory>(allProductCategory);

  const [page, setPage] = useState<number>(1);

  const [visitId, setVisitId] = useState<any | null>(null);
  const [vibeImageUrl, setVibeImageUrl] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);

  const getVisitId = async () => {
    const response = await fetch(
      visitAPI,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitAPIBody)
      });

    const result = await response.json();
    setVisitId(result.visitId);
  }

  const getVibeData = async () => {
    if (visitId !== null) {
      const response = await fetch(`${vibeAPI}?page=${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "visitId": visitId
        },
        body: JSON.stringify(vibeAPIBody)
      });

      const results = await response.json();

      if (results.ok) {
        const {
          furrlProductCategoryList,
          productData
        } = results;

        setVibeImageUrl(results.vibeImageUrl);
        setTotalProducts(results.totalStoredProductIdsCount);

        let currentProducts: IProduct[] | [] = [];


        let currentCategories: ICategory[] = [allProductCategory];

        // populate category list
        furrlProductCategoryList.map((item: any) => {
          const category: ICategory = {
            id: item.furrlProductCategoryId,
            name: item.furrlProductCategoryName
          };
          currentCategories = [...currentCategories, category]
        });

        setProductCategories(currentCategories);


        // populate product list
        productData.map((item: any) => {
          let categoryId: string | null = null;

          if (productCategories !== null) {
            item.map(({ furrlProductCategoryList }: any) => {
              furrlProductCategoryList.map(({ furrlProductCategoryId }: any) => {
                if (productCategories.includes(furrlProductCategoryId)) {
                  categoryId = furrlProductCategoryId;
                }
              })
            })
          }

          if (categoryId !== null) {
            const product: IProduct = {
              id: item.id,
              productId: item.productid,
              compare_at_price: item.compare_at_price,
              price: item.price,
              title: item.title,
              image: item[0].src,
              brandName: item.brandName,
              furrlDiscountPercent: item.furrlDiscountPercent,
              furrlProductCategoryId: categoryId,
            };

            currentProducts = [...currentProducts, product];
          }

        });
        setProducts((previous: any) => [...previous, ...currentProducts]);
      }
    }
  };

  useEffect(() => {
    getVisitId();
  }, []);

  useEffect(() => {
    getVibeData();
  }, [page, visitId]);

  return (
    <main className="
      flex flex-col
      min-h-screen
    ">
      {/* MENU BAR */}
      <TopMenu />
      {/* HERO */}
      {
        vibeImageUrl &&
        <VibeImage vibeImageUrl={vibeImageUrl} />
      }

      {/*PRODUCTS GALLERY*/}
      <div className="">
        <div className="
          m-2
          italic text-gray-800
        ">
          {totalProducts ? `${totalProducts}` : ""} Products
        </div>
        <div className="">
          {/* FILTERS */}
          <Filters
            productCategories={productCategories}
            selectedProductsCategory={selectedProductsCategory}
            setSelectedProductsCategory={setSelectedProductsCategory}
          />

          {/* PRODUCTS */}
          <div className=""></div>

        </div>
      </div>

    </main>
  )
}
