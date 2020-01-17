import React from 'react' ;
import { NavBar, Icon } from 'antd-mobile';

class NavBarHello extends React.Component{

    render(){
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >NavBar</NavBar>

            <NavBar
                mode="dark"
                leftContent="Back"
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >NavBar</NavBar>
        </div>) ;
    }
}

export default NavBarHello ;