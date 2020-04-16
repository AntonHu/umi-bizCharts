import React from 'react';

interface IconfontProps {
  name: string;
  className?: string;
}
/**自定义图标 */
const Iconfont: React.SFC<IconfontProps> = (props: IconfontProps) => {
  return <i className={`iconfont ${props.name || ''} ${props.className}`} />;
};

export default Iconfont;
