'use client';

import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createPageURL } from "@/app/lib/utils";

export default function PaginationArrow({
  page,
  direction,
  isDisabled,
}: {
  page: number,
  direction: 'left' | 'right',
  isDisabled?: boolean
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const href = createPageURL(pathname, page, searchParams);

  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}