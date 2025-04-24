// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';

// お知らせ記事の型定義
type Props = {
  id: string;
  title: string;
};

// microCMSからお知らせ記事を取得
async function getNewsPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'news', // 'news'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title',  // idとtitleを取得
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
          <li key={post.id}>
            <Link href={`/news/${post.id}`}> {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}