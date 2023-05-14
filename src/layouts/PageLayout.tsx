import { type ReactNode, type FC } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer/Footer'

type PageLayoutProps = {
  children: ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>sportclub</title>
        <meta name="description" content="site of sportclub" />
        <link rel="shortcut icon" href="/icons/logo.svg" />
      </Head>
      <Header />
      <main className="pt-[80px] m-auto max-w-[2200px]">
        {children}
      </main>
      {/* <Footer /> */}
    </>
    
  )
}

export default PageLayout