import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/Table";
import Layout from "./Layout";
import { useAuth } from "../../context/AuthContext";
import Card from "../../components/cards/Cards";

type Product = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brand: string;
  imageUrl: string;
  isActive: boolean;
};

type Category = {
  id: string;
  name: string;
  description: string;
  products?: Product[];
};

type User = {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  categories?: Category[];
};

export default function Home() {
  const navigate = useNavigate();
  const { user }: { user: User | null } = useAuth();
  const [totals, setTotals] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else if (user && user.categories) {
      const totalProducts = user.categories.reduce((acc: number, category: Category) => {
        return acc + (category.products?.length || 0);
      }, 0);

      const activeProducts = user.categories.reduce((acc: number, category: Category) => {
        return acc + (category.products?.filter((product: Product) => product.isActive).length || 0);
      }, 0);

      const totalValue = user.categories.reduce((acc: number, category: Category) => {
        return (
          acc +
          (category.products?.reduce((sum: number, product: Product) => sum + product.price, 0) || 0)
        );
      }, 0);

      setTotals({ totalProducts, activeProducts, totalValue });
      setLoading(false);
    }
  }, [navigate, user]);

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full">
          
          <Card
            loading={loading}
            title="Produtos Cadastrados"
            value={totals.totalProducts.toString()}
            description="Valor total."
          />

          <Card
            loading={loading}
            title="Produtos Ativos"
            value={totals.activeProducts.toString()}
            description="A partir do status."
          />

          <Card
            loading={loading}
            title="Valor Total"
            value={`R$ ${totals.totalValue.toFixed(2)}`}
            description="Somados a partir do preço de cada item."
            valueClassName="text-[#1BC5BD]"
          />
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-[#F3F6F9] p-4">
          <TableComponent />
        </div>
      </div>
    </Layout>
  );
}
