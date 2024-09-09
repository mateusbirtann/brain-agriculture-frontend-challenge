import React from "react";
import { Button } from "../../../components/ui/button";

export function PaginationControls({ table, pageIndex, setPageIndex }: any) {
  return (
    <div className="flex items-center space-x-2 py-4 justify-start md:justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageIndex((old: number) => Math.max(old - 1, 0))}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPageIndex((old: number) => old + 1)}
        disabled={!table.getCanNextPage()}
      >
        Próximo
      </Button>
    </div>
  )
}