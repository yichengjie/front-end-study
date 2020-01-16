import React from 'react' ;
import { WingBlank, WhiteSpace } from 'antd-mobile';
import './styles/WingBlankHello.css' ;

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

const WingBlankHello = () => (
    <div style={{ padding: '15px 0' }}>
        <WingBlank size ="lg"><PlaceHolder /></WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank size="md"><PlaceHolder /></WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank size="sm"><PlaceHolder /></WingBlank>
    </div>
);

export default WingBlankHello ;

