const Footer = () => {
  return (
    <footer className="md:flex-row md:justify-between md:text-lg text-base flex flex-wrap flex-col justify-center text-center items-center container mx-auto px-4 md:px-10">
      <p>{new Date().getFullYear()} &copy; Uncut Diamonds</p>
      <ul className="flex gap-8">
        <li>
          <a
            href="https://tipply.pl/u/uncutdiamonds"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition underline hover:text-zinc-400"
          >
            Wspomóż nas
          </a>
        </li>
        <li>
          Wykonanie{" "}
          <a
            href="https://konradrosa.com"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition underline hover:text-zinc-400"
          >
            konradrosa.com
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
