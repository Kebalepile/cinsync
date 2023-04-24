import MPFileProvider from '@/contexts/media/state'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
    <MPFileProvider>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </MPFileProvider>
  )
}
