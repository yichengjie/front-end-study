import React ,{Component} from 'react' ;
import { Spin } from 'antd';


let options = [
    {
        examinationFlag:"0",
        examinationClassLabel:'01班',
        examinationClassValue:'1' ,
        score:'0'
    },{
        examinationFlag:"0",
        examinationClassLabel:'02班',
        examinationClassValue:'2' ,
        score:'0'
    },{
        examinationFlag:"0",
        examinationClassLabel:'03班',
        examinationClassValue:'3' ,
        score:'0'
    },{
        examinationFlag:"0",
        examinationClassLabel:'04班',
        examinationClassValue:'4' ,
        score:'0'
    },{
        examinationFlag:"0",
        examinationClassLabel:'05班',
        examinationClassValue:'5' ,
        score:'0'
    },
    {
        examinationFlag:"0",
        examinationClassLabel:'15班',
        examinationClassValue:'15' ,
        score:'0'
    },
] ;


class ExaminationBody extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            loading:true
        } ;
    }

    componentDidMount() {

        setTimeout(()=>{
            this.setState({
                loading:false
            }) ;
            this.props.handleBodyUpdateClassList([...options]) ;
        },1500) ;


    }

    handleBodyChangeExaminationStatus(index,value){
        return (e) =>{
            this.props.handleBodyChangeExaminationStatus(index,value) ;
        }
    }

    handleBodyChangeExaminationFlag(index){
       return (e) => {
           let value = e.target.checked ? "1" : "0" ;
           this.props.handleBodyChangeExaminationFlag(index,value) ;
       }
    }


    renderTableHeader(){
        return (
            <tr>
                <th></th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label y-hand"
                          style={{backgroundColor: "#a9823e"}}>优秀</span>
                </th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label label-success y-hand">合格</span>
                </th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label label-danger y-hand">不合格</span>
                </th>
                <th></th>
            </tr>
        ) ;
    }

    renderTableBody(){
        let list = this.props.classList ;
        return list.map((item,index) =>{
            return (
                <tr key={index}>
                    <td align="center">
                        <input type="checkbox"
                               className="y-examination-class"
                               checked={item.examinationFlag === '1'}
                               onChange={this.handleBodyChangeExaminationFlag(index)}
                        />
                        &nbsp;{item.examinationClassLabel}

                    </td>
                    <td align="center">
                        <input type="radio" value="1"
                               name={"name_"+item.examinationClassValue}
                               checked={item.score === '1'}
                               onChange={this.handleBodyChangeExaminationStatus(index,'1')}
                        />
                    </td>
                    <td align="center">
                        <input type="radio" value="2"
                               name={"name_"+item.examinationClassValue}
                               checked={item.score === '2'}
                               onChange={this.handleBodyChangeExaminationStatus(index,'2')}
                        />
                    </td>
                    <td align="center">
                        <input type="radio" value="3"
                               name={"name_"+item.examinationClassValue}
                               checked={item.score === '3'}
                               onChange={this.handleBodyChangeExaminationStatus(index,'3')}
                        />
                    </td>
                    <td>备注</td>
                </tr>
            ) ;
        }) ;

    }

    renderTable(){
        return (
            <table className="table">
                <thead>
                    {this.renderTableHeader()}
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
        ) ;
    }

    renderLoading(){
        return (
            <div style={{textAlign:"center"}}>
                <Spin size="large" tip="数据加载中，请耐心等待..."/>
            </div>
        ) ;
    }



    render() {
        return (
            <div className="y-body">
                {this.state.loading ?  this.renderLoading() : this.renderTable()}
            </div>
        ) ;
    }
}

export default ExaminationBody ;