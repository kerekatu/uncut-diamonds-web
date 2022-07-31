import Layout from "@/components/Layout";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";

const Wiki = () => {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <Layout customMeta={{ title: "Minecraft Wiki" }}>
      <section className="w-full">
        <div>
          <div className="flex justify-between items-center bg-zinc-900 rounded-xl py-4 px-8 w-full">
            <h2 className="font-bold text-xl">Category</h2>
            <ChevronDownIcon className="h-8" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Wiki;
