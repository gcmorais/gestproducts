"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import axios from "axios";
import { Label } from "../ui/label";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useAuth } from "../../context/AuthContext";
import { Modal } from "../modal/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "../ui/input";

export default function TableComponent() {
  const { user } = useAuth();
  const storedToken = localStorage.getItem("token"); // Certifique-se de que o token JWT está armazenado corretamente

  const data = React.useMemo(
    () =>
      user?.categories.flatMap((category) =>
        category.products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          category: category.name,
          categoryId: category.id,
          brand: product.brand,
          price: product.price,
          stockQuantity: product.stockQuantity,
          imageUrl: product.imageUrl,
          status: product.isActive ? "Ativo" : "Inativo",
        }))
      ) || [],
    [user]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns: ColumnDef<(typeof data)[0]>[] = React.useMemo(
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
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleOpenModal(row.original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

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
    debugTable: false,
  });

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    console.log(product)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (key: string, value: any) => {
    setSelectedProduct((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      if (!selectedProduct?.id) {
        throw new Error("ID do produto não encontrado.");
      }

      const response = await axios.put(
        `https://localhost:7280/api/Product/${selectedProduct.id}`,
        selectedProduct,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error.message);
      alert("Erro ao atualizar o produto. Tente novamente.");
    }
  };

  return (
    <>
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
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        title="Editar Produto"
      >
        {selectedProduct && (
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={selectedProduct.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                value={selectedProduct.brand || ""}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                value={selectedProduct.price || ""}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Estoque</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={selectedProduct.stockQuantity || ""}
                onChange={(e) =>
                  handleInputChange(
                    "stockQuantity",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedProduct.status || "Inativo"}
                onValueChange={(value) =>
                  handleInputChange("status", value === "Ativo")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
