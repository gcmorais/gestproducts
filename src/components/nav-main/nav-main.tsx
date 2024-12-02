import { useEffect, useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

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
  const [modalTitle, setModalTitle] = useState<string>("");
  const [formType, setFormType] = useState<string>("");
  const [formData, setFormData] = useState<any>({});
  const [categories, setCategories] = useState<any[]>([]);
  const storedToken = localStorage.getItem("token");

  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/api/Category/GetAll",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error.message);
      }
    };

    fetchCategories();
  }, [storedToken]);

  const handleOpenModal = (title: string, type: string) => {
    setModalTitle(title);
    setFormType(type);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormType("");
    setFormData({});
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [key]: value }));
  };

  const createCategory = async (
    name: string,
    description: string,
    userId: string
  ) => {
    try {
      const response = await axios.post(
        "https://localhost:7280/api/Category",
        {
          name,
          description,
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Categoria criada com sucesso:", response.data);
        return response.data;
      } else {
        throw new Error("Resposta inesperada do servidor.");
      }
    } catch (error: any) {
      console.error(
        "Erro ao criar categoria:",
        error.response?.data || error.message
      );
      throw new Error("Não foi possível criar a categoria. Tente novamente.");
    }
  };

  const createProduct = async (data: any) => {
    try {
      const response = await axios.post(
        "https://localhost:7280/api/Product",
        data,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
  
      if (response.status === 201 || response.status === 200) {
        console.log("Produto criado com sucesso:", response.data);
        
        return response.data;
      } else {
        throw new Error("Resposta inesperada do servidor.");
      }
    } catch (error: any) {
      console.error(
        "Erro ao criar produto:",
        error.response?.data || error.message
      );
      throw new Error("Não foi possível criar o produto. Tente novamente.");
    }
  };

  const showMessageAndUpdatePage = () => {
    alert("Item adicionado com sucesso!");
  
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  

  const handleSave = async () => {
    if (formType === "category") {
      await createCategory(formData.name, formData.description, user.id);
    } else if (formType === "product") {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10),
        brand: formData.brand,
        imageUrl: formData.imageUrl,
        categoryId: formData.categoryId,
      });
    }
    handleCloseModal();
    showMessageAndUpdatePage();
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
                                  "category"
                                )
                              }
                            >
                              <span>{subItem.title}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleOpenModal("Adicionar Produto", "product")
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
        onSave={handleSave}
        title={modalTitle}
      >
        {formType === "category" && (
          <form>
            <div className="mb-4">
              <Label htmlFor="categoryName">Nome</Label>
              <Input
                id="categoryName"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="categoryDescription">Descrição</Label>
              <Input
                id="categoryDescription"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </form>
        )}
        {formType === "product" && (
          <form>
            <div className="mb-4">
              <Label htmlFor="productName">Nome</Label>
              <Input
                id="productName"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productDescription">Descrição</Label>
              <Input
                id="productDescription"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productPrice">Preço</Label>
              <Input
                id="productPrice"
                value={formData.price || ""}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productStock">Quantidade em estoque</Label>
              <Input
                id="productStock"
                value={formData.stockQuantity || ""}
                onChange={(e) =>
                  handleInputChange("stockQuantity", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productBrand">Marca</Label>
              <Input
                id="productBrand"
                value={formData.brand || ""}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productImage">Imagem do produto</Label>
              <Input
                id="productImage"
                value={formData.imageUrl || ""}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="productCategory">Categoria</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("categoryId", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolher categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
