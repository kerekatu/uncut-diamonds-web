import Comments from "@/components/Home/Comments";
import Tags from "@/components/Home/Tags";
import Layout from "@/components/Layout";
import Button, { BUTTON_STYLES, MagicButton } from "@/components/ui/Button";
import { differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout showHeader={false} customMeta={{ title: "Strona Główna" }}>
      <section className="flex flex-col w-full items-center justify-center gap-2 relative overflow-hidden">
        <Comments />
        <motion.div
          initial={{ translateY: -150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/static/logo.svg"
            alt="Uncut Diamonds Logo"
            height={190}
            width={540}
            className="pointer-events-none animate-float"
          />
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ translateY: 150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Tags />
          <h3 className="hidden mb-6 text-xl sm:block md:w-[600px]">
            Dołącz do naszej długowiecznej społeczności
            <b className="font-semibold">
              {" "}
              ({differenceInDays(new Date(), new Date(2021, 1, 1))} dni)
            </b>
            , otwartej na nowe znajomości. U nas zagrasz, pogadasz i weźmiesz
            udział w wydarzeniach! Czekamy!
          </h3>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-6 divide-y divide-zinc-700"
          initial={{ translateY: 150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6">
            <MagicButton />
            <Link href="/shop">
              <a className={BUTTON_STYLES.ctaSecondary}>Sklep</a>
            </Link>
          </div>

          <div className="pt-6">
            <Button
              variant="ctaSecondary"
              className="text-base bg-green-600 border-green-600 disabled:hover:bg-green-600 disabled:hover:border-green-600 disabled:hover:text-white"
              disabled
            >
              Minecraft - wkrótce
            </Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Home;
