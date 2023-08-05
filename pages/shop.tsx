import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import PurchaseList from "@/components/PurchaseList";
import { useModal } from "@/hooks/useModal";
import { addSpaceEveryCharacter, formatHoursToDays } from "@/libs/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { ApiResponse, FaunaResponse, ShopItem, User } from "types";

const Modal = dynamic(() => import("@/components/Modal"));

interface SelectedItem {
  id: string;
  title: string;
  price: number;
  stock?: string;
}

const Shop: NextPage = () => {
  const { data: session } = useSession();
  const { data: shop } = useSWR<FaunaResponse<ShopItem>>("/api/shop");
  const { data: user } = useSWR<ApiResponse<User>>(
    `/api/users/${session?.user.id}`
  );
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const { modalOpen, handleToggle, handleCancel } = useModal();

  if (!user || !shop || !Array.isArray(shop?.data)) return <Loader />;

  const isAffordable = (item: ShopItem): boolean => {
    return item && item.price <= user?.data?.bank;
  };

  const handleAccept = async () => {
    const purchase = await fetch("/api/shop", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: session?.user.id,
        item: selectedItem?.id,
        ref: session?.user.ref,
      }),
    });
    const response = await purchase.json();
    setIsDisabled(true);

    if (response.status === "200") {
      toast.success(`Przedmiot "${selectedItem?.title}" został kupiony`);
      handleCancel();
      setSelectedItem(null);
      setIsDisabled(false);
    } else {
      toast.error(`Coś poszło nie tak. Spróbuj ponownie`);
      handleCancel();
      setSelectedItem(null);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Layout customMeta={{ title: "Sklep" }}>
        <section
          className={`flex flex-col gap-16 ${
            selectedItem || !session ? "mb-16" : ""
          }`}
        >
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {shop.data.length > 1 ? (
              shop.data
                .filter((item) => item.data.stock !== "0")
                .sort((a, b) => a.data.price - b.data.price)
                .map((item) => (
                  <li
                    className={`border-2 border-zinc-900 shadow-xl bg-zinc-900 rounded-xl px-8 py-4 cursor-pointer transition-all ${
                      isAffordable(item.data) &&
                      (selectedItem?.id === item.ref.id
                        ? "border-2 !border-green-600 drop-shadow-xl"
                        : "hover:border-green-600 hover:border-opacity-50 hover:drop-shadow-xl")
                    } ${
                      !isAffordable(item.data)
                        ? "opacity-50 cursor-default"
                        : ""
                    }`}
                    key={item.ref.id}
                    onClick={() =>
                      isAffordable(item.data) &&
                      (selectedItem?.id === item.ref.id
                        ? setSelectedItem(null)
                        : setSelectedItem({
                            id: item.ref.id,
                            title: item.data.title,
                            price: item.data.price,
                          }))
                    }
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex gap-2">
                        {item.data?.author && (
                          <span className="flex items-center self-start border border-zinc-800 px-3 py-1 rounded-md font-normal text-base gap-2">
                            <Image
                              src={item.data.author.image}
                              alt="User Avatar"
                              width={21}
                              height={21}
                              className="rounded-full"
                            />
                            {item.data.author.name}
                          </span>
                        )}
                        {item.data?.duration && (
                          <span className="self-start border border-zinc-800 px-3 py-1 rounded-md font-normal text-base">
                            {formatHoursToDays(item.data.duration)}
                          </span>
                        )}
                      </div>
                      <h3 className="flex items-center mt-2 gap-x-2 gap-y-2 text-2xl font-bold leading-7">
                        {item.data.title}
                      </h3>

                      <span className="font-light leading-6 mt-2 mb-auto">
                        {item.data.description}
                      </span>
                      <div className="flex justify-between items-center mt-6 w-full">
                        <span>
                          Ilość:{" "}
                          {item.data.stock === "Infinite"
                            ? "∞"
                            : item.data.stock}
                        </span>
                        <span className="flex items-center gap-1">
                          Cena: {addSpaceEveryCharacter(item.data.price)}
                          <Image
                            src="/static/diament.png"
                            alt="Uncut Diamonds Currency Symbol"
                            width={16}
                            height={16}
                            quality={100}
                          />
                        </span>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li>{shop.data[0].data.title}</li>
            )}
          </motion.ul>
          {!session ? (
            <div className="fixed bottom-0 inset-x-0 bg-zinc-900 w-full px-10 p-6 flex items-center justify-center  font-bold gap-2 h-24 z-10 text-lg md:text-2xl">
              <button
                className="text-green-500 underline transition-colors hover:text-green-600"
                onClick={() => signIn("discord")}
              >
                Zaloguj się
              </button>{" "}
              by skorzystać ze sklepu
            </div>
          ) : (
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  initial={{ translateY: 100 }}
                  animate={{ translateY: 0 }}
                  exit={{ translateY: 100 }}
                  className="flex fixed bottom-0 right-0 bg-zinc-900 w-full px-10 py-4 gap-2 h-24"
                >
                  <div className="flex w-full items-center justify-center md:justify-between">
                    <div className="hidden md:flex md:flex-col">
                      <span className="flex items-center gap-1">
                        <strong>Do zapłaty:</strong>{" "}
                        {addSpaceEveryCharacter(selectedItem.price)}{" "}
                        <Image
                          src="/static/diament.png"
                          alt="Uncut Diamonds Currency Symbol"
                          width={16}
                          height={16}
                          quality={100}
                        />{" "}
                        ({user.data.bank - selectedItem.price})
                      </span>
                      <span className="flex gap-1">
                        <strong>Wybrane:</strong>
                        {selectedItem.title}
                      </span>
                    </div>
                    <button
                      className={`bg-green-600 px-24 py-2 rounded-xl text-white font-bold text-xl transition-all ${
                        selectedItem
                          ? "opacity-100 cursor-pointer hover:bg-green-500"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={handleToggle}
                    >
                      Kup
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          <PurchaseList />
        </section>
        <Toaster />
      </Layout>

      {modalOpen && selectedItem ? (
        <Modal
          acceptButton={{ title: "Akceptuj", handleAccept: !isDisabled && handleAccept }}
          cancelButton={{ title: "Anuluj", handleCancel }}
          modalOpen={modalOpen}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            Kupujesz: {selectedItem.title}
            <div className="flex text-lg font-normal flex-col items-center sm:flex-row">
              <span className="flex items-center gap-1 mr-2">
                {addSpaceEveryCharacter(selectedItem.price)}
                <Image
                  src="/static/diament.png"
                  alt="Uncut Diamonds Currency Symbol"
                  width={16}
                  height={16}
                  quality={100}
                />
              </span>
              zostanie pobrane z twojego konta!
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Shop;
