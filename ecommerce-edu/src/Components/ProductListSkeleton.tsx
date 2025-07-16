import { Skeleton, Stack } from "@mui/material";

const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[292px] h-[401px] shadow-md rounded-xl border p-3 bg-white"
        >
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rounded" width={200} height={30} />
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
