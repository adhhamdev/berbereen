import { getLoggedInUser } from '@/lib/server/appwrite';
import Image from 'next/image';
import Link from 'next/link';
import CardActions from './card-actions';
import CardOptions from './card-options';

export default async function PostCard({ post }) {
  const currentUser = await getLoggedInUser();
  return (
    <div className='relative w-full p-4 pb-2 space-y-3 border-b-2 p1 border-slate-300'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Image
            src={post.user.avatar}
            alt=''
            width={30}
            height={30}
            className='rounded-full'
          />
          <p className='ml-2 text-base font-semibold'>{post.user.name}</p>
          <span className='mx-1'>•</span>
          <span className='text-sm font-medium text-slate-500'>
            {post.user.email}
          </span>
        </div>
        <CardOptions />
      </div>
      <div>
        <p className='w-full text-sm font-medium text-black'>{post.text}</p>
      </div>
      {post.image && (
        <div className='relative h-64 w-fit'>
          <Link href={`/image/${post.$id}`} scroll={false}>
            <Image
              src={post.image}
              alt=''
              width={300}
              height={300}
              className='object-cover h-full rounded-lg max-h-64 hover:brightness-75'
            />
          </Link>
        </div>
      )}
      <CardActions post={post} currentUser={currentUser} />
    </div>
  );
}
