import { useContext } from 'react';
import { css } from '@emotion/react';
import {
  Card,
  ConfigProvider,
  theme,
  Tag,
} from 'antd';
import { useLocale } from 'dumi';
import useMenu from '../hooks/useMenu';
import useSiteToken from "../hooks/useSiteToken";
import SiteContext from '../slots/SiteContext';
import { ComponentSampleImages } from '../common/config/overview';

const useStyle = ({
  isDark,
  isMobile,
 }) => {

  const { token } = useSiteToken();
  const { fontFamily } = token;

  return {
    mainContainer: css`
      font-family: ${fontFamily};
    `,
    groupContainer: css`

    `,
    groupTitle: css`
      font-size: 24px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
    `,
    cardWrap: css`
      padding-top: 24px;
      padding-bottom: 24px;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    `,
    card: css`
      display: block;
      width: 25%;
      min-width: 300px;
      padding-right: 24px;
      padding-bottom: 24px;
      box-sizing: border-box;
      cursor: pointer;

      @media only screen and (max-width: 1600px) {
        width: 33.333%;
      }

      @media only screen and (max-width: 1200px) {
        width: 50%;
      }

      @media only screen and (max-width: 880px) {
        width: 100%;
        padding-right: 0;
      }

      a {
        all: initial;
        cursor: pointer;
        color: ${isDark ? '#fff' : '#333'}
      }

      .ant-card-head-title a {
        font-weight: 500;
      }
    `
  }
}

export default ({
  lang
}) => {
  const [menuItems] = useMenu();
  const siteConfig = useContext(SiteContext);
  const isDark = siteConfig.theme.includes('dark');
  const isMobile = !!siteConfig.isMobile;
  const style = useStyle({ isDark, isMobile });
  const locale = useLocale();
  const isEn = locale.id === 'en';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div css={style.mainContainer}>
        {
          menuItems?.slice(1)?.map((parent) => {
            return (
              <div key={parent.key}>
                <span
                  css={style.groupTitle}
                >
                  {parent.label}
                  <Tag style={{
                    marginLeft: 8,
                  }}>
                    {(parent.children || []).length}
                  </Tag>
                </span>

                <div
                  css={style.cardWrap}
                >
                  {
                    (parent.children || []).map((item) => {
                      return (
                        <a
                          key={item.key}
                          css={style.card}
                          href={isEn ? item.key + '-en' : item.key}
                        >
                          <Card
                            title={item.label}
                          >
                            <img
                              src=""
                            />
                            {item.label}
                          </Card>
                        </a>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </ConfigProvider>
  )
}