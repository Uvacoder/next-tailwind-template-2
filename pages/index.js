import React from 'react'
import Head from 'next/head'
import 'twin.macro'

import * as fs from 'fs/promises'
import * as path from 'path'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'

export default function Home({ content, frontmatter }) {
  const Component = React.useMemo(() => getMDXComponent(content), [content])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main tw="min-h-screen flex items-center justify-center">
        <h1>{frontmatter.title}</h1>
        <Component />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const mdxSource = await fs.readFile('content/index.mdx')
  const { code: content, frontmatter } = await bundleMDX(mdxSource, {
    cwd: path.join(process.cwd(), 'content'),
  })
  return {
    props: {
      content,
      frontmatter,
    },
  }
}
