import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';

const Home = ({ setBreadcrumb }) => {
  let { t } = useTranslation();
  const router = useRouter()

  useEffect(() => {
    setBreadcrumb([{
      path: '/',
      name: t('common:dashboard')
    }])
  }, [])

  return (
    <div>locales {router.locale}</div>
  );
}

export default Home;