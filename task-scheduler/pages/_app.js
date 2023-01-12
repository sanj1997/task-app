import '../styles/globals.css'

import {ChakraProvider} from "@chakra-ui/react"
import { AppContextProvider } from '../hoc/AppContext'
export default function App({ Component, pageProps }) {
  return <ChakraProvider><AppContextProvider><Component {...pageProps} /></AppContextProvider></ChakraProvider>
}
