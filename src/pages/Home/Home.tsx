import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/Table";
import Layout from "./Layout";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full">
          <div className="h-56 w-full rounded-xl bg-muted/50 p-4 flex flex-col items-left justify-between bg-[#F3F6F9]">
            <div>
              <h1 className="text-3xl font-semibold text-[#464E5F]">
                Produtos Cadastrados
              </h1>
            </div>
            <div>
              <h2 className="text-6xl font-medium text-[#464E5F]">60</h2>
            </div>
            <div>
              <h3 className="text-lg text-[#B5B5C3]">Valor total.</h3>
            </div>
          </div>
          <div className="h-56 w-full rounded-xl bg-muted/50 p-4 flex flex-col items-left justify-between bg-[#F3F6F9]">
            <div>
              <h1 className="text-3xl font-semibold text-[#464E5F] ">
                Produtos ativos
              </h1>
            </div>
            <div>
              <h2 className="text-6xl font-medium text-[#464E5F]">40</h2>
            </div>
            <div>
              <h3 className="text-lg text-[#B5B5C3]">A partir do status.</h3>
            </div>
          </div>
          <div className="h-56 w-full rounded-xl bg-muted/50 p-4 flex flex-col items-left justify-between bg-[#F3F6F9]">
            <div>
              <h1 className="text-3xl font-semibold text-[#464E5F]">
                Valor Total
              </h1>
            </div>
            <div>
              <h2 className="text-6xl font-medium text-[#1BC5BD]">R$ 60.000</h2>
            </div>
            <div>
              <h3 className="text-lg text-[#B5B5C3]">
                Somados a partir do preço de cada item.
              </h3>
            </div>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-[#F3F6F9] p-4">
          <TableComponent />
        </div>
      </div>
    </Layout>
  );
}
