import { useState } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Modal } from "../modal/modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const handleOpenModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Comandos</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          {subItem.title === "Categoria" ? (
                            <button
                              onClick={() =>
                                handleOpenModal(
                                  "Adicionar Categoria",
                                  <div>
                                    <form>
                                      <div className="mb-4">
                                        <Label htmlFor="categoryName">Nome</Label>
                                        <Input id="categoryName" />
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="categoryDescription">Descrição</Label>
                                        <Input id="categoryDescription" />
                                      </div>
                                    </form>
                                  </div>
                                )
                              }
                            >
                              <span>{subItem.title}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleOpenModal(
                                  "Adicionar Produto",
                                  <div>
                                    <form>
                                      <div className="mb-4">
                                        <Label htmlFor="productName">Nome</Label>
                                        <Input id="productName"/>
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productDescription">Descrição</Label>
                                        <Input id="productDescription"/>
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productCategory">Categoria</Label>
                                        <Select>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Escolher categoria" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="category1">
                                              Categoria 1
                                            </SelectItem>
                                            <SelectItem value="category2">
                                              Categoria 2
                                            </SelectItem>
                                            <SelectItem value="category3">
                                              Categoria 3
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productPrice">Preço</Label>
                                        <Input />
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productStock">Quantidade em estoque</Label>
                                        <Input id="productStock" />
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productBrand">Marca</Label>
                                        <Input id="productBrand" />
                                      </div>
                                      <div className="mb-4">
                                        <Label htmlFor="productImage">Imagem do produto</Label>
                                        <Input id="productImage" />
                                      </div>
                                    </form>
                                  </div>
                                )
                              }
                            >
                              <span>{subItem.title}</span>
                            </button>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={() => console.log("Dados salvos!")}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </>
  );
}
