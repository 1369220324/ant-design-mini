// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import nprogress from '/Users/zhaolin/__CODES__/_mini/ant-design-mini/node_modules/nprogress';
import './nprogress.css';
import UserLoading from '/Users/zhaolin/__CODES__/_mini/ant-design-mini/node_modules/dumi/dist/client/pages/Loading';
import React, { useLayoutEffect, type FC } from 'react';
import { useSiteData } from 'dumi';

const DumiLoading: FC = () => {
  const { setLoading } = useSiteData();

  useLayoutEffect(() => {
    setLoading(true);
    nprogress.start();

    return () => {
      setLoading(false);
      nprogress.done();
    }
  }, []);

  return <UserLoading />
}

export default DumiLoading;
