import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'next-share'

import Modal from 'react-modal';

type TShareMenu = {
  productName: string,
  link: string,
  shareMenuOpen: boolean,
  setShareMenuOpen: (value: boolean) => void,
}

type TShareMenuButtons = {
  productName: string,
  link: string,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ShareButtons({ productName, link }: TShareMenuButtons) {
  return <div className="flex justify-center gap-3">
    <div className="">
      <FacebookShareButton
        url={link}
        quote={`Check out this ${productName}`}
        hashtag={'#unfurrlyourstyle'}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
    <div className="">
      <PinterestShareButton
        url={link}
        media={`Check out this ${productName}`}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
    </div>
  </div>
}

function ShareMenu({ productName, link, shareMenuOpen, setShareMenuOpen }: TShareMenu) {
  let subtitle: any;


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }


  return <Modal
    isOpen={shareMenuOpen}
    style={customStyles}
    contentLabel="Share Menu"
  >
    <div className="w-56">
      <div className="font-larger font-bold">Share your find!</div>
      <div className="">{productName}</div>
      <div className="py-4">
        <ShareButtons
          productName={productName}
          link={link}
        />
      </div>
      <div className="grid justify-items-stretch">
        <div className="font-bold p-1 justify-self-end">
          <button onClick={() => setShareMenuOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  </Modal>
}

export default ShareMenu;