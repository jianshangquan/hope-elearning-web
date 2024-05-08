import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL_LOCAL } from "@/lib/constants";
import { Page, Tag } from "@/lib/models";
import { validateResponse } from "@/lib/validate-response";
import { cookies } from "next/headers";
import TagActionButtons from "./tag-action-buttons";
import TagCreateButton from "./tag-create-button";
import { buildQueryParams, formatNumber } from "@/lib/utils";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const getTags = async ({ searchParams }: Props) => {
  const query = buildQueryParams({
    ...searchParams,
    limit: 10,
    includePostCount: true,
  });
  const url = `${API_URL_LOCAL}/admin/tags${query}`;

  const resp = await fetch(url, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  await validateResponse(resp);

  return (await resp.json()) as Page<Tag>;
};

export default async function Tags(props: Props) {
  const data = await getTags(props);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Tags</h2>
        <TagCreateButton />
      </div>
      <Table>
        {data.contents.length === 0 && (
          <TableCaption className="text-start">No tags found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase min-w-[300px] w-full">
              Tag
            </TableHead>
            <TableHead className="uppercase min-w-[200px]">Slug</TableHead>
            <TableHead className="uppercase min-w-[200px]">
              No.of posts
            </TableHead>
            <TableHead className="uppercase min-w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {data.contents.map((t, i) => {
            return (
              <TableRow key={t.id}>
                <TableCell>
                  <h6>{t.name}</h6>
                </TableCell>
                <TableCell className="text-sliver text-sm">{t.slug}</TableCell>
                <TableCell className="text-sliver text-sm">
                  {formatNumber(BigInt(t.postCount ?? 0))}
                </TableCell>
                <TableCell>
                  <TagActionButtons tag={t} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-8 flex justify-end">
        <Pagination
          totalPage={data.currentPage}
          currentPage={data.currentPage}
        />
      </div>
    </>
  );
}
