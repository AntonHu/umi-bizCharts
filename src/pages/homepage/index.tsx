import React from 'react';
import { observer, inject } from 'mobx-react';
import { UIStore } from '@/store/UI';
import { OilStore } from '@/store/Oil';
import { Button } from 'antd';
import styles from './index.less';

interface IIndexProps {
  uiStore: UIStore
  oilStore: OilStore
}

@inject('uiStore', 'oilStore')
@observer
class Index extends React.Component<IIndexProps> {

  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    const { uiStore, oilStore } = this.props;
    uiStore.toggleLoading();
    const result = await oilStore.getOilPrice();
    console.log(result);
    uiStore.toggleLoading();
  }

  render() {
    const { oilStore } = this.props;
    return (
      <div>
      <h1 className={styles.title}>Page index</h1>
        <Button onClick={this.initData}>test</Button>
        {
          oilStore.priceList.map(item => <div key={item.f_item_name}>{item.f_item_name}</div>)
        }
      </div>
    );
  }
}

export default Index;