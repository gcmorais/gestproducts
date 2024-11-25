import { useState } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../components/ui/sidebar";
import { Modal } from "../modal/modal";

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
                                        <label htmlFor="categoryName" className="block mb-1">
                                          Nome
                                        </label>
                                        <input
                                          id="categoryName"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite o nome da categoria"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="categoryDescription" className="block mb-1">
                                          Descrição
                                        </label>
                                        <input
                                          id="categoryDescription"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite a descrição da categoria"
                                        />
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
                                        <label htmlFor="productName" className="block mb-1">
                                          Nome
                                        </label>
                                        <input
                                          id="productName"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite o nome do produto"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="productDescription" className="block mb-1">
                                          Descrição
                                        </label>
                                        <input
                                          id="productDescription"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite a descrição do produto"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="productPrice" className="block mb-1">
                                          Preço
                                        </label>
                                        <input
                                          id="productPrice"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite o preço do produto"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="productStock" className="block mb-1">
                                          Quantidade em estoque
                                        </label>
                                        <input
                                          id="productStock"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite a quantidade em estoque do produto"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="productBrand" className="block mb-1">
                                          Marca
                                        </label>
                                        <input
                                          id="productBrand"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite a marca do produto"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label htmlFor="productImage" className="block mb-1">
                                          Imagem do produto
                                        </label>
                                        <input
                                          id="productImage"
                                          type="text"
                                          className="w-full border px-3 py-2 rounded"
                                          placeholder="Digite o link para imagem do produto"
                                        />
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
