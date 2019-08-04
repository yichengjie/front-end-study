import React ,{Component} from 'react' ;
import { Spin,Modal, Input } from 'antd';
const { TextArea } = Input;


let options = [
    {
        examinationFlag:"0",
        examinationClassLabel:'01班',
        examinationClassValue:'1' ,
        score:'0',
        markingContent:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'02班',
        examinationClassValue:'2' ,
        score:'0',
        markingContent:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'03班',
        examinationClassValue:'3' ,
        score:'0',
        markingContent:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'04班',
        examinationClassValue:'4' ,
        score:'0',
        markingContent:''
    },{
        examinationFlag:"0",
        examinationClassLabel:'05班',
        examinationClassValue:'5' ,
        score:'0',
        markingContent:''
    },
    {
        examinationFlag:"0",
        examinationClassLabel:'15班',
        examinationClassValue:'15' ,
        score:'0',
        markingContent:''
    },
] ;


class ExaminationBody extends Component{

    constructor(props){
        super(props) ;
        this.state = {
            loading:true,
            marking: false,
            markingIndex:0,
            markingContent:''
        } ;
        //显示备注对话框处理
        this.showMarkingModal = this.showMarkingModal.bind(this) ;
        //隐藏备注对话框处理
        this.hideMarkingModal = this.hideMarkingModal.bind(this) ;
        //点击确认时事件处理
        this.okMarkingModal = this.okMarkingModal.bind(this) ;
        //备注内容输入处理函数
        this.handleMarkingContentInput = this.handleMarkingContentInput.bind(this) ;

    }

    componentDidMount() {

        setTimeout(()=>{
            this.setState({
                loading:false,
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


    showMarkingModal(index) {
        return ()=>{
            let obj = this.props.classList[index] ;
            let value = obj.markingContent ;
            this.setState({
                marking: true,
                markingIndex:index,
                markingContent:value,
            });
        }
    }

    hideMarkingModal(){
        this.setState({
            marking: false,
            markingContent:'',
            markingIndex:0
        });
    }

    okMarkingModal(){
        let index = this.state.markingIndex ;
        let content = this.state.markingContent ;
        this.props.handleBodyMarkingContent(index,content) ;
        this.hideMarkingModal() ;
    }


    //备注输入框输入处理
    handleMarkingContentInput(e){
        let value =  e.target.value ;
        this.setState({markingContent:value}) ;
    }

    renderTableHeader(){
        return (
            <tr>
                <th width="80"></th>
                <th width="60" align="center" style={{textAlign: "center"}}>
                    <span className="label y-hand"
                          style={{backgroundColor: "#a9823e"}}>优秀</span>
                </th>
                <th width="60" align="center" style={{textAlign: "center"}}>
                    <span className="label label-success y-hand">合格</span>
                </th>
                <th>
                    <span style={{marginLeft:"5px"}} className="label label-danger y-hand">不合格</span>
                </th>
                <th width="60"></th>
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
                    <td >
                        <input type="radio" value="3"
                               style={{marginLeft:"20px"}}
                               name={"name_"+item.examinationClassValue}
                               checked={item.score === '3'}
                               onChange={this.handleBodyChangeExaminationStatus(index,'3')}
                        />
                        {
                            item.score === '3' ?
                                (<span className="text-success y-hand" style={{marginLeft:"5px"}}>
                                    请选择
                                </span>)
                                : null
                        }
                    </td>
                    <td><div className="y-hand" onClick={this.showMarkingModal(index)}>备注</div></td>
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

    renderMarkContentDialog(){
        return (
            <Modal
                title="自定义原因"
                visible={this.state.marking}
                onOk={this.okMarkingModal}
                onCancel={this.hideMarkingModal}
                okText="确认"
                cancelText="取消"
            >
                <TextArea rows={4}
                          value={this.state.markingContent}
                          onChange={this.handleMarkingContentInput}
                />
            </Modal>
        ) ;
    }

    render() {
        return (
            <div className="y-body">
                {this.state.loading ?  this.renderLoading() : this.renderTable()}
                {this.renderMarkContentDialog()}
            </div>
        ) ;
    }
}

export default ExaminationBody ;