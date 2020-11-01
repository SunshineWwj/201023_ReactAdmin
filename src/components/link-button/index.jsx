/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import './index.less';

/**
 * 封装的一个外形类似 a标签的按钮
 * @param {*} props
 */

//函数形式
// export default function LinkButton (props){
//     return <button {...props} className='link-button'></button>
// }

//class形式
export default class LinkButton extends Component {
    render() {
        return (
            <button {...this.props} className="link-button"></button>
        );
    }
}
