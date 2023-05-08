import { type ReactNode, type FC } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'

type PageLayoutProps = {
  children: ReactNode
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>sportclub</title>
        <meta name="description" content="site of sportclub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='pt-[80px] h-[2000px]'>
        {children}
      </main>
    </>
    
  )
}

export default PageLayout