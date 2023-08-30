"use client";

import Image from 'next/image'

import { ReactNode, useEffect, useState } from 'react';
import { isCallChain } from 'typescript';

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

  // types
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

  // state
  const [products, setProducts] = useState<any>([]);

  const [productCategories, setProductCategories] = useState<ICategory[] | null>();
  const [selectedProductsCategories, setSelectProductCategories] = useState<ICategory[] | null>(null);

  const [page, setPage] = useState<number>(1);

  const [visitId, setVisitId] = useState<any | null>(null);
  const [vibeImageUrl, setVibeImageUrl] = useState<any | null>(null);
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


        const allProductCategory: ICategory = {
          name: "All",
          id: "0"
        };
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
      <div className="
        flex items-center w-full
        z-10 p-4
      ">
        <div className="grow text-center">

          #Vibe Page
        </div>
        <div className="grow-0 w-8 text-center">
          B
        </div>
        <div className="grow-0 w-8 text-center">
          C
        </div>
      </div>

      {/* HERO */}
      <div className="w-full">
        <div className="w-full">
          {vibeImageUrl && <Image
            src={vibeImageUrl}
            alt="Vibe Image"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: '50%' }}
          />}
        </div>
      </div>
      <div className="
        w-full p-3
      ">
        <div className="
          inset-3 bg-gray-100 rounded-lg h-10
          flex justify-around items-center
        ">
          <div className="bg-white w-fit h-fit rounded-md p-1">
            Products
          </div>
        </div>
      </div>

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
          <div className="flex gap-3 px-3 overflow-x-auto scrollbar-hide">
            {
              productCategories && productCategories.map(category => <div className="
                border-solid border-2 rounded-3xl
                p-2
              " key={category.id}>{`${category.name}`}</div>)
            }
          </div>

          {/* PRODUCTS */}
          <div className=""></div>

        </div>
      </div>

    </main>
  )
}
