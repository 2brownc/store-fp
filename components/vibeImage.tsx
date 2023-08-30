import React from 'react';
import Image from 'next/image'

type TVibeImage = {
  vibeImageUrl: string
}

function VibeImage({ vibeImageUrl }: TVibeImage) {
  return (
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

  )
}

export default VibeImage;