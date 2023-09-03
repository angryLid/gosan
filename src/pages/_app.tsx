import { trpc } from '~/utils/trpc-provider'
import type { AppProps } from 'next/app'
import "@/styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(
  App
)