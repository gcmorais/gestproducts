import { GalleryVerticalEnd, Home, Plus, Settings } from "lucide-react";
import { NavMain } from "../nav-main/nav-main";
import { NavUser } from "../nav-user/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";


import { useAuth } from "../../context/AuthContext";

export function AppSidebar() {
  const { user } = useAuth();

  const userData = user
    ? {
        name: user.fullName || "Nome Completo",
        email: user.email || "email@anonimo.com",
        avatar: "/avatars/default.jpg",
      }
    : {
        name: "Carregando...",
        email: "carregando@exemplo.com",
        avatar: "/avatars/loading.jpg",
      };

  const data = {
    user: userData,
    items: [
      {
        title: "Início",
        url: "/home",
        icon: Home,
      },
      {
        title: "Configurações",
        url: "/home",
        icon: Settings,
      },
    ],
    navMain: [
      {
        title: "Adicionar",
        url: "/home",
        icon: Plus,
        isActive: true,
        items: [
          {
            title: "Categoria",
            url: "/home",
          },
          {
            title: "Produto",
            url: "/home",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">gestProducts</span>
                  <span>Product Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

