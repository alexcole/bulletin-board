import Image from 'next/image'
import pushPinIcon from '../public/push-pin.png'

export const PushPin = (props: {}) => {
  return (
    <Image alt="Push Pin" src={pushPinIcon} objectFit="cover" quality={100} />
  )
}
