import { BaseLayout } from '@components/layout'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default MyApp
