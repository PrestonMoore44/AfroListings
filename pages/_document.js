import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://cdn.tiny.cloud/1/zq4kgku6qtfp8k5buue6qjr9g2i2vtxj7asuy7dlqn7oimic/tinymce/6/tinymce.min.js" referrerPolicy="origin"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}