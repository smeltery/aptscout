import Image from 'next/image';
import Link from 'next/link';

export const repository = 'https://github.com/smeltery/aptscout';

export function Brand({ docs = false }: { docs?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="aptscout home">
      <Image src="/logo.svg" alt="" width={32} height={32} />
      {docs ? (
        <span>aptscout.</span>
      ) : (
        <span>
          smeltery<span className="brand-sub"> / aptscout</span>
        </span>
      )}
    </Link>
  );
}
