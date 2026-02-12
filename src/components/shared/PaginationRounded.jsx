"use client";
import { Stack, Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationRounded({ totalCount, PAGE_SIZE }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);

  function handleChange(e, value) {
    router.push(`?page=${value}`);
  }

  return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(totalCount/PAGE_SIZE)} page={page} variant="outlined" shape="rounded" onChange={handleChange}/>
    </Stack>
  );
}