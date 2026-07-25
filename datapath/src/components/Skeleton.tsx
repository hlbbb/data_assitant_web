import './Skeleton.css'

interface SkeletonProps {
  variant: 'title' | 'text' | 'code' | 'card' | 'circle' | 'rect'
  width?: string
  height?: string
  size?: number
  count?: number
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  width,
  height,
  size,
  count = 1,
}) => {
  const style: React.CSSProperties = {}
  if (width) style.width = width
  if (height) style.height = height

  if (variant === 'circle' && size) {
    const pxVal = size + 'px'
    style.width = pxVal
    style.height = pxVal
    style.borderRadius = '50%'
  }

  const items = Array.from({ length: count }, (_, i) => i)

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={'skeleton skeleton--' + variant}
          style={i === 0 ? style : undefined}
        />
      ))}
    </>
  )
}

export default Skeleton
