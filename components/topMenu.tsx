import Image from 'next/image';

function TopMenu() {
  return (
    <div className="
        flex items-center w-full
        z-10 p-4
      ">
      <div className="grow text-center text-xl">

        #Vibe Page
      </div>
      <div className="grow-0 w-8">
        <a href="https://web.furrl.in/wishlist">
          <Image
            src="/images/wishlist_black.png"
            alt="shoping cart"
            height={24}
            width={24}
          />
        </a>
      </div>
      <div className="grow-0 w-8">
        <a href="https://web.furrl.in/cart">
          <Image
            src="/images/bag_black.png"
            alt="shoping cart"
            height={24}
            width={24}
          />
        </a>
      </div>
    </div>
  )
}

export default TopMenu;