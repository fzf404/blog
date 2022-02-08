import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Layout from '../../components/layout'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import utilStyles from '../../styles/utils.module.css'

// 动态导入
const GitalkComponent = dynamic(() => import('gitalk/dist/gitalk-component'), { ssr: false })

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div id="gitalk-container"></div>
        <GitalkComponent
          options={{
            clientID: '87a257476a95fcf272f3',
            clientSecret: '00faa256d339e630e66a7115f0303fdf3906313c',
            repo: 'blog-comment', // The repository of store comments,
            owner: 'fzf404',
            admin: ['fzf404'],
            id: postData.title, // Ensure uniqueness and length less than 50
            distractionFreeMode: true, // Facebook-like distraction free mode
          }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
