"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import * as React from "react"

import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

// Supondo que useAuth() retorna os dados do usuário logado
import { useAuth } from "../../context/AuthContext"

export default function TableComponent() {
  // Obtendo dados do usuário logado
  const { user } = useAuth()

  // Extraindo a lista de produtos das categorias
  const data = user?.categories.flatMap(category =>
    category.products.map(product => ({
      id: product.id,
      name: product.name,
      category: category.name, // Associando a categoria do produto
      brand: product.brand,
      price: product.price,
      stockQuantity: product.stockQuantity,
      status: product.isActive ? "Ativo" : "Inativo",
    }))
  ) || []

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const columns: ColumnDef<typeof data[0]>[] = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "category",
        header: "Categoria",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "brand",
        header: "Marca",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        header: "Preço",
        cell: (info) => `R$ ${info.getValue().toFixed(2)}`,
      },
      {
        accessorKey: "stockQuantity",
        header: "Estoque",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        header: "Ações",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Deletar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver mais</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="overflow-x-auto">
      
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div className="flex items-center space-x-2">
                    <span>{header.column.columnDef.header}</span>
                    {header.column.getCanSort() && (
                      <Button
                        variant="link"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody emptyMessage="No records found">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
