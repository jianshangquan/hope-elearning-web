"use client";

import { cn } from "@/lib/utils";
import {
  Pagination as NextUIPagination,
  PaginationItem,
} from "@nextui-org/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface PaginationProps {
  basePath?: string;
  totalPage: number;
  currentPage: number;
}

export default function Pagination({
  basePath = "",
  totalPage,
  currentPage,
}: PaginationProps) {
  const sp = useSearchParams();

  const params = useMemo(() => {
    const params = new URLSearchParams(sp.toString());
    params.delete("page");
    return params.size > 0 ? `?${params.toString()}&` : "?";
  }, [sp]);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <NextUIPagination
      showControls
      total={totalPage}
      initialPage={1}
      page={currentPage}
      disableAnimation
      renderItem={({
        ref,
        key,
        value,
        onNext,
        onPrevious,
        onPress,
        setPage,
        ...props
      }) => {
        if (value === "dots") {
          const p = props.isBefore
            ? currentPage - props.dotsJump
            : currentPage + props.dotsJump;
          return (
            <Link
              key={key}
              href={`${basePath}${params}page=${p}`}
              className={props.className}
            >
              {props.children}
            </Link>
          );
        }

        const disabled =
          (value === "prev" && props.activePage === 1) ||
          (value === "next" && props.activePage === props.total);

        let p = value;
        if (value === "prev") {
          p = currentPage - 1;
        } else if (value === "next") {
          p = currentPage + 1;
        }

        if (disabled) {
          return <PaginationItem key={key} isDisabled={true} {...props} />;
        }

        return (
          <Link
            key={key}
            href={`${basePath}${params}page=${p}`}
            className={cn(
              props.className,
              props.isActive ? "bg-primary text-white" : undefined
            )}
          >
            {props.children}
          </Link>
        );
      }}
    />
  );
}
