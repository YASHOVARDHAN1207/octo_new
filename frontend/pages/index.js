import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Octo</title>
        <meta name="description" content="Octo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen my-4 scrollbar-hide'>
        <h3 className='text-3xl text-gray-50'>Hola</h3>
      </main>

      <footer className='bg-[#0a0a0b]'></footer>
    </div>
  )
}
