require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import 'antd/dist/antd.css'
import {InputNumber, Row, Col, Table} from 'antd';
// let yeomanImage = require('../images/yeoman.png');

function getResult(a = 0, b = 0, c = 0) {
  let flag = b * b - 4 * a * c;
  var x1 = {
      a: 0,
      i: 0
    },
    x2 = {
      a: 0,
      i: 0
    };

  if (flag === 0) {
    x1.a = x2.a = -b / (2 * a)
  }

  if (flag > 0) {
    x1.a = (-b + Math.sqrt(b * b - flag)) / (2 * a)
    x2.a = (-b - Math.sqrt(b * b - flag)) / (2 * a)
  }

  if (flag < 0) {
    x1.a = x2.a = -b / (2 * a);
    x1.i = Math.sqrt(4 * a * c - b * b) / (2 * a)
    x2.i = -Math.sqrt(4 * a * c - b * b) / (2 * a)
  }

  return {x1, x2}
}

// a11=1/E1
// a22=1/E2
// a66=1/G12
// a12= -V12/E2
// a16= a26=0
const inputStyle = {
    margin: '5px 0',
    width: '80%'
}

const columns = [
    {
        title: 'x',
        dataIndex: 'x'
    },
    {
        title: 'y',
        dataIndex: 'y'
    },
    {
        title: `${String.fromCharCode(963)}x`,
        dataIndex: 'x'
    },
    {
        title: `${String.fromCharCode(963)}y`,
        dataIndex: 'x'
    },
    {
        title: `${String.fromCharCode(964)}xy`,
        dataIndex: 'x'
    },
]
let a  = 1;
class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //层合板性能
            E1: 1,
            E2: 2,
            G12: 0,
            V12: 0,

            //孔尺寸
            a: 1,
            c: 2,
            w: 0,

            a11: 1,
            a22: 0,
            a66: 0,
            a12: 0,
            a16: 0,

            //远场应力
            sigma_x: 0,
            sigma_y: 0,
            tau_xy: 0
        };
    }
  render() {
      const state = this.state;
    return (
      <div className="index">
        <Row>
            <Col span={4}>
                <div>
                    <h2 style={{color: 'white'}}>
                        孔尺寸(mm)
                    </h2>
                        <InputNumber type='number' style={inputStyle} value={state.a} onChange={e=>this.setState({a:e.target.value})}></InputNumber>
                        <InputNumber type='number' style={inputStyle} value={state.c} onChange={e=>this.setState({c:e.target.value})}></InputNumber>
                        <InputNumber type='number' style={inputStyle} value={state.w} onChange={e=>this.setState({w:e.target.value})}></InputNumber>
                </div>
                <div>
                    <h2  style={{color: 'white'}}>
                        层合板性能(Mpa)
                    </h2>
                    <InputNumber type='number' style={inputStyle} value={state.E1} onChange={e=>this.setState({E1:e.target.value, a11: 1/e.target.value})}></InputNumber>
                    <InputNumber type='number' style={inputStyle} value={state.E2} onChange={e=>this.setState({E2:e.target.value, a22: 1/e.target.value, a12: -state.V12/e.target.value})}></InputNumber>
                    <InputNumber type='number' style={inputStyle} value={state.G12} onChange={e=>this.setState({G12:e.target.value, a66: 1/e.target.value})}></InputNumber>
                    <InputNumber type='number' style={inputStyle} value={state.V12} onChange={e=>this.setState({V12:e.target.value, a12: -e.target.value/state.E2})}></InputNumber>
                </div>

                <div>
                    <h2 style={{color: 'white'}}>
                        远场应力(Mpa)
                    </h2>
                    <InputNumber type='number' style={inputStyle} value={state.sigma_x} onChange={e=>this.setState({sigma_x:e.target.value})}></InputNumber>
                    <InputNumber type='number' style={inputStyle} value={state.sigma_y} onChange={e=>this.setState({sigma_y:e.target.value})}></InputNumber>
                    <InputNumber type='number' style={inputStyle} value={state.tau_xy} onChange={e=>this.setState({tau_xy:e.target.value})}></InputNumber>
                </div>
            </Col>
            <Col span={12} offset={1}>
                <Table columns={columns}></Table>
            </Col>
        </Row>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
