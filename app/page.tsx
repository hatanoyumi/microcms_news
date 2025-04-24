// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';
import styles from './page.module.css';
import dayjs from "dayjs";

// お知らせ記事の型定義
type Props = {
  id: string;
  title: string;
  publishedAt: string;
};

// microCMSからお知らせ記事を取得
async function getNewsPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'news', // 'news'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title,publishedAt',  // idとtitleを取得
      limit: 15,  // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getNewsPosts();

  return (
    <main>
      <h1>お知らせ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.list}>
            <Link href={`/news/${post.id}`}> {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
              {/* 日付を表示 */}
              <span className='style.date'>{dayjs(post.publishedAt).format('YY.MM.DD')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}