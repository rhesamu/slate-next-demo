import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import TextEditor from '../components/TextEditor'

const SlateNextDemo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Slate Next Demo</title>
        <meta name="description" content="A text editor application using Slate and NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TextEditor />
    </div>
  )
}

export default SlateNextDemo
