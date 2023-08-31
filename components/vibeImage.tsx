import React from 'react';
import Image from 'next/image'

type TVibeImage = {
  vibeImageUrl: string
}

function VibeImage({ vibeImageUrl }: TVibeImage) {
  return (
    <div className="w-full">
      {vibeImageUrl && <Image
        src={vibeImageUrl}
        alt="Vibe Image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ objectFit: "cover" }}
        className="w-full h-72"
      />}
    </div>
  )
}

export default VibeImage;