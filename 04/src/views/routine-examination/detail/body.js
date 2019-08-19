import React ,{Component} from 'react' ;
import { Spin,Icon} from 'antd';
import _  from 'lodash' ;

class ExaminationBody extends Component{
    renderTableHeader(){
        return (
            <tr>
                <th width="50"></th>
                <th width="50" align="center" style={{textAlign: "center"}}>
                    <span className="label y-hand"
                          style={{backgroundColor: "#a9823e"}}>优秀</span>
                </th>
                <th width="50" align="center" style={{textAlign: "center"}}>
                    <span className="label label-success y-hand">合格</span>
                </th>
                <th>
                    <span style={{marginLeft:"5px"}} className="label label-danger y-hand">不合格</span>
                </th>
                <th width="80"></th>
            </tr>
        ) ;
    }

    renderTableBody(){
        let list = this.props.classList ;
        return list.map((item,index) =>{
            return (
                <ExaminationListItem key ={index}
                     itemData = {item}
                     index = {index}
                     handleBodyChangeItemValue = {this.props.handleBodyChangeItemValue}
                     showMarkingDialog = {this.props.showMarkingDialog}
                     showUnqualifiedSelectDialog = {this.props.showUnqualifiedSelectDialog}
                     quotaOptions = {this.props.quotaOptions}
                />
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
        let {bodyLoading} = this.props ;
        return (
            <div className="y-body">
                {bodyLoading ?  this.renderLoading() : this.renderTable()}
            </div>
        ) ;
    }
}



class ExaminationListItem extends Component{
    constructor(props){
        super(props) ;
        //显示备注对话框处理
        this.showMarkingDialog = this.showMarkingDialog.bind(this) ;
        this.showUnqualifiedSelectDialog = this.showUnqualifiedSelectDialog.bind(this) ;
        //----------------------------------------------------------//
        //改变改变检查状态--优秀-合格-不合格
        this.handleChangeExaminationStatus = this.handleChangeExaminationStatus.bind(this) ;
        //改变检查项是否选中
        this.handleChangeExaminationFlag = this.handleChangeExaminationFlag.bind(this) ;
        //-----------------------------------------------------------//
    }

    //改变改变检查状态--优秀-合格-不合格
    handleChangeExaminationStatus(e){
        let index = this.props.index ;
        let value = e.target.value ;
        let name = 'score' ;
        this.props.handleBodyChangeItemValue(index,name,value) ;
    }
    //改变检查项是否选中
    handleChangeExaminationFlag(e){
        let index = this.props.index ;
        let value = e.target.checked ? "1" : "0" ;
        let name = "examinationFlag" ;
        this.props.handleBodyChangeItemValue(index,name,value) ;
    }
    //显示备注对话框
    showMarkingDialog() {
        let index = this.props.index ;
        let value = this.props.itemData.markingContent ;
        this.props.showMarkingDialog(index,value) ;
    }

    showUnqualifiedSelectDialog(){
        let index = this.props.index ;
        this.props.showUnqualifiedSelectDialog(index) ;
    }

    containsItem(list,item){
        for(let i =0 ; i < list.length ; i++){
            if(list[i] === (item +'')){
                return true ;
            }
        }
        return false;
    }
    //当score为不合格时,显示所有的指标
    renderScore3(){
        let {itemData,quotaOptions} = this.props ;
        let quotaList = itemData.quotaList ;
        let arr =  _.filter(quotaOptions, (item) => {
            return this.containsItem(quotaList,item.id) ;
        }) ;
        let farr = arr.map(item => item.title ) ;
        let str = farr.join(',') ;
        //<Icon type="picture" />

        return (
            <span className="text-info y-hand" style={{marginLeft:"5px"}}
                  onClick={this.showUnqualifiedSelectDialog}>
                 { (str === '') ? '请选择' : str  }
                 &nbsp;&nbsp;
                {itemData.photoUrl === '' ?  '': <Icon type="picture" />}
            </span>
        ) ;
    }

    render() {
        let itemData = this.props.itemData ;
        let label = itemData.examinationClassLabel.replace(/高\d{4}级/,'') ;
        label = label.replace("（","") ;
        label = label.replace("）","") ;
        label = label.replace("(","") ;
        label = label.replace(")","") ;
        return (
            <tr>
                <td align="center">
                    <input type="checkbox"
                           className="y-examination-class"
                           checked={itemData.examinationFlag === '1'}
                           onChange={this.handleChangeExaminationFlag}
                    />
                    &nbsp;{label}
                </td>
                <td align="center">
                    <input type="radio" value="1"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '1'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                </td>
                <td align="center">
                    <input type="radio" value="2"
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '2'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                </td>
                <td >
                    <input type="radio" value="3"
                           style={{marginLeft:"20px"}}
                           name={"name_"+itemData.examinationClassValue}
                           checked={itemData.score === '3'}
                           onChange={this.handleChangeExaminationStatus}
                    />
                    {
                        itemData.score === '3' ? this.renderScore3() : null
                    }
                </td>
                <td><div className="y-hand text-info"
                         onClick={this.showMarkingDialog}
                    >{(itemData.markingContent === '') ? '备注': itemData.markingContent}</div>
                </td>
            </tr>
        ) ;
    }

}

export default ExaminationBody ;