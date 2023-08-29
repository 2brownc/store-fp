import Image from 'next/image'
import { Z_VERSION_ERROR } from 'zlib'

export default function Home() {
  return (
    <main className="
      flex flex-col items-center justify-between
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
      <div className="">
        HERO PHOTO
        <div className="">
          #NightFlea
        </div>
      </div>
      <div>
        Tab Bar
        <div className="">
          Products
        </div>
      </div>

      {/*PRODUCTS GALLERY*/}
      <div className="">
        <div className="">{} Products</div>
        <div className="">
          {/* FILTERS */}
          <div className="">All</div>
          <div className="">Home</div>
          <div className="">Apparel</div>
          <div className="">Accessories</div>

          {/* PRODUCTS */}
          <div className=""></div>

        </div>
      </div>

    </main>
  )
}
