
import Image from 'next/image'

interface IconProps {
  width?: number
  height?: number
  className: string
}

export const Icons = {
  logo: ({ width = 350, height = 200, className }: IconProps) => (
    <Image src='/logo.svg' alt='logo' width={width} height={height} className={className} />
  ),
}
