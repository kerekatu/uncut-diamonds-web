import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-zinc-800 text-zinc-300 text-lg">
          <Main />
          <NextScript />
          <div id="modal"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
