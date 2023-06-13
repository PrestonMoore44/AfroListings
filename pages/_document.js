import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/gsap.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/Flip.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/Observer.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/ScrollToPlugin.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/ScrollTrigger.min.js"></script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <script
            src="https://cdn.tiny.cloud/1/zq4kgku6qtfp8k5buue6qjr9g2i2vtxj7asuy7dlqn7oimic/tinymce/6/tinymce.min.js"
            referrerPolicy="origin"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
