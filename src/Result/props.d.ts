import { IBaseProps, IconType } from '../_base';

/**
 * @description 结果页，用于展示用户操作后的信息反馈。
 */

export interface IResultProps extends IBaseProps {
  /**
   * @description 内置类型 success=成功 danger=错误/危险 info=信息提示 wait=等待处理
   */
  type?: 'success' | 'danger' | 'info' | 'warn' | 'wait';
  
  /**
   * @description 自定义图片，如果配置了 type， 则不生效
   */
  image?: IconType;

  /**
   * @description 主文案
   */
  title?: string;

  /**
   * @description 副文案
   */
  message?: string;

  /**
   * @description 按钮点击回调
   */
  onButtonTap?: (index: number) => void;
}
export declare const ResultDefaultProps: Partial<IResultProps>;