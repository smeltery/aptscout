import Image from 'next/image';
export function BrandIcon({
  name,
  size = 19,
}: {
  name: string;
  size?: number;
}) {
  return (
    <Image
      className="brand-icon"
      src={`/brands/${name}.svg`}
      alt=""
      width={size}
      height={size}
    />
  );
}
