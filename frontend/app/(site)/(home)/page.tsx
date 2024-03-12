import { PostList } from '@/app/(site)/(home)/components/post-list';
import { PostService } from '@/services/post.service';

export default async function MainPage() {
  const data = await PostService.getPostList(0, 11);

  return (
    <div className='container flex-wrap py-6 lg:py-10'>
      <PostList initialData={data} />
    </div>
  );
}
