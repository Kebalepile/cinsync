import MPFileProvider from "@/contexts/media/state";
import MediaUXProvider from "@/contexts/mediaUX/state";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <MPFileProvider>
      <MediaUXProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MediaUXProvider>
    </MPFileProvider>
  );
}
