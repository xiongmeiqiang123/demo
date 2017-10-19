require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import 'antd/dist/antd.css'
import {InputNumber, Row, Col, Table} from 'antd';
import quad4solve from './math.js'
import Complex from 'complex-js'
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
            tau_xy: 0,

            x: 0,
            y: 0
        };
    }
    caculate=()=>{
        const {a11, a16, a66, a22, a12} = this.state;

        let result = quad4solve(a11, 0, 2*a12 + a66, 0, a22)
        console.log('0');
        if(!result) {
            return;
        }

        let Mu_1 = Complex(result.x1.Re, result.x1.Im),
            Mu_2 = Complex(result.x3.Re, result.x3.Im),
            Mu_3 = Complex(result.x2.Re, result.x2.Im),
            Mu_4 = Complex(result.x4.Re, result.x4.Im);
            console.log('1');
        this.setState({
            Mu_1,
            Mu_2,
            Mu_3,
            Mu_4
        }, this.getResult)

    }

    getResult=()=>{
        const {Mu_1, Mu_2, sigma_x, sigma_y, tau_xy, x, y, a, c} = this.state;
        let fai_1 = this.getFai({Mu_1, Mu_2, sigma_x, sigma_y, tau_xy, x, y, a, c, k:1})
        let fai_2 = this.getFai({Mu_1, Mu_2, sigma_x, sigma_y, tau_xy, x, y, a, c, k:2})
        console.log({Mu_1, Mu_2, sigma_x, sigma_y, tau_xy, x, y, a, c, k:2});
        console.log(fai_2,  '-----');
        console.log(fai_1, '-----');
    }

    getFai=(data={})=>{
        const {Mu_1, Mu_2, sigma_x, sigma_y, tau_xy, x, y, a, c, k} = data;
        let Mu_3_k = k === 1? Mu_2 : Mu_1;
        let Mu = k === 1?Mu_1: Mu_2;
        const Sigma_x = Complex(sigma_x, 0)
        const Sigma_y = Complex(sigma_y, 0)
        const Tau_xy = Complex(tau_xy, 0)
        const X = Complex(x, 0)
        const Y = Complex(y, 0)
        const C = Complex(c, 0)
        const A = Complex(a, 0)

        const Z_k = X['+'](Y['*'](Mu))

        let t1 = Mu_3_k['*'](Sigma_x)['+'](Tau_xy);
        let t2 = Complex.I['*'](C)['*'](Mu_3_k['*'](Tau_xy)['+'](Sigma_x))

        let t3 = t1['-'](t2)
        let t4 = Complex(2, 0)['*']

        let left = t3['/'](t4)

        let t5 = Complex(1, 0)['-'](Complex(0, 1)['*'](C)['*'](Mu))
        let t6 = Z_k['/'](A)
        let t7 = Z_k['*'](Z_k)['/'](A['*'](A))
        let t8 = Mu['*'](Mu)['/'](C['*'](C))['-'](Complex(1,0))
        let t9 = Complex.sqrt(t7['-'](t8))

        let middle = t5['/'](t6['+'](t9))
        let right = Complex(1, 0)['/'](t9)

        let result = left['*'](middle)['*'](right)

        return result;


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
                        <InputNumber type='number' key='1' style={inputStyle} value={state.a} onChange={e=>this.setState({a:e}, this.caculate)}></InputNumber>
                        <InputNumber type='number' key='2' style={inputStyle} value={state.c} onChange={e=>this.setState({c:e}, this.caculate)}></InputNumber>
                        <InputNumber type='number' key='3' style={inputStyle} value={state.w} onChange={e=>this.setState({w:e}, this.caculate)}></InputNumber>
                </div>
                <div>
                    <h2  style={{color: 'white'}}>
                        层合板性能(Mpa)
                    </h2>
                    <InputNumber type='number' key='4' style={inputStyle} value={state.E1} onChange={e=>this.setState({E1:e, a11: 1/e}, this.caculate)}></InputNumber>
                    <InputNumber type='number' key='5' style={inputStyle} value={state.E2} onChange={e=>this.setState({E2:e, a22: 1/e, a12: -state.V12/e}, this.caculate)}></InputNumber>
                    <InputNumber type='number' key='6' style={inputStyle} value={state.G12} onChange={e=>this.setState({G12:e, a66: 1/e}, this.caculate)}></InputNumber>
                    <InputNumber type='number' key='7' style={inputStyle} value={state.V12} onChange={e=>this.setState({V12:e, a12: -e/state.E2}, this.caculate)}></InputNumber>
                </div>

                <div>
                    <h2 style={{color: 'white'}}>
                        远场应力(Mpa)
                    </h2>
                    <InputNumber type='number' key='1' style={inputStyle} value={state.sigma_x} onChange={e=>this.setState({sigma_x:e}, this.caculate)}></InputNumber>
                    <InputNumber type='number' key='2' style={inputStyle} value={state.sigma_y} onChange={e=>this.setState({sigma_y:e}, this.caculate)}></InputNumber>
                    <InputNumber type='number' key='3' style={inputStyle} value={state.tau_xy} onChange={e=>this.setState({tau_xy:e}, this.caculate)}></InputNumber>
                </div>
            </Col>
            <Col span={12} offset={1}>
                <InputNumber type='number'  key='1' style={inputStyle} value={state.x} onChange={e=>this.setState({x:e}, this.caculate)}></InputNumber>
                <InputNumber type='number'  key='3' style={inputStyle} value={state.y} onChange={e=>this.setState({y:e}, this.caculate)}></InputNumber>
                // <Table columns={columns}></Table>
            </Col>
        </Row>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
