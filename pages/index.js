import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter()
  return (
    <div>locales {router.locale}</div>
  );
}

export default Home;