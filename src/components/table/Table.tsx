"use client"

import {
    ColumnDef,
    ColumnFiltersState,
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
import { Input } from "../../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"

const data: Product[] = [
  {
    id: "1",
    name: "Produto 1",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 250.00,
    stockQuantity: 2,
    status: "Ativo",
  },
  {
    id: "2",
    name: "Produto 2",
    category: "Categoria 2",
    brand: "Marca 2",
    price: 300.00,
    stockQuantity: 5,
    status: "Inativo",
  },
  {
    id: "3",
    name: "Produto 3",
    category: "Categoria 3",
    brand: "Marca 3",
    price: 150.00,
    stockQuantity: 10,
    status: "Ativo",
  },
  {
    id: "4",
    name: "Produto 4",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 400.00,
    stockQuantity: 7,
    status: "Ativo",
  },
  {
    id: "5",
    name: "Produto 5",
    category: "Categoria 2",
    brand: "Marca 2",
    price: 550.00,
    stockQuantity: 8,
    status: "Inativo",
  },
  {
    id: "6",
    name: "Produto 6",
    category: "Categoria 3",
    brand: "Marca 3",
    price: 250.00,
    stockQuantity: 5,
    status: "Ativo",
  },
  {
    id: "7",
    name: "Produto 7",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 800.00,
    stockQuantity: 2,
    status: "Inativo",
  },
  {
    id: "8",
    name: "Produto 8",
    category: "Categoria 2",
    brand: "Marca 2",
    price: 300.00,
    stockQuantity: 4,
    status: "Ativo",
  },
  {
    id: "9",
    name: "Produto 9",
    category: "Categoria 3",
    brand: "Marca 3",
    price: 150.00,
    stockQuantity: 6,
    status: "Ativo",
  },
  {
    id: "10",
    name: "Produto 10",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 250.00,
    stockQuantity: 3,
    status: "Inativo",
  },
  {
    id: "11",
    name: "Produto 11",
    category: "Categoria 2",
    brand: "Marca 2",
    price: 1200.00,
    stockQuantity: 1,
    status: "Ativo",
  },
  {
    id: "12",
    name: "Produto 12",
    category: "Categoria 3",
    brand: "Marca 3",
    price: 150.00,
    stockQuantity: 5,
    status: "Ativo",
  },
  {
    id: "13",
    name: "Produto 13",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 1800.00,
    stockQuantity: 3,
    status: "Inativo",
  },
  {
    id: "14",
    name: "Produto 14",
    category: "Categoria 2",
    brand: "Marca 2",
    price: 1500.00,
    stockQuantity: 5,
    status: "Ativo",
  },
  {
    id: "15",
    name: "Produto 15",
    category: "Categoria 3",
    brand: "Marca 3",
    price: 450.00,
    stockQuantity: 2,
    status: "Ativo",
  },
  {
    id: "16",
    name: "Produto 16",
    category: "Categoria 1",
    brand: "Marca 1",
    price: 300.00,
    stockQuantity: 4,
    status: "Inativo",
  },
]

export type Product = {
  id: string
  name: string
  category: string
  brand: string
  price: number
  stockQuantity: number
  status: "Ativo" | "Inativo"
}

export default function TableComponent() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  
    const columns: ColumnDef<Product>[] = React.useMemo(
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
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })
  
    return (
      <div className="overflow-x-auto">
        <Input
          value={(columnFilters[0]?.value as string) ?? ""}
          onChange={(e) => {
            setColumnFilters([
              { id: "name", value: e.target.value },
              { id: "category", value: e.target.value },
              { id: "brand", value: e.target.value },
            ])
          }}
          placeholder="Buscar por nome, categoria ou marca"
          className="mb-4"
        />
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
          <TableBody>
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
