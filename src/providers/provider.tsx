import { ReactNode } from 'react'
import { QueryProvider } from './queryProvider'
import { RouterProvider } from './routerProvider'
import { ThemeProvider } from './themeProvider'

const providers = [ThemeProvider, QueryProvider, RouterProvider]

const Providers = () => {
  return providers.reduceRight((acc: ReactNode, Prv) => {
    return <Prv>{acc}</Prv>
  }, null)
}

export default Providers
