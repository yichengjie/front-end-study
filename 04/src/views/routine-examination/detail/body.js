import React ,{Component} from 'react' ;


let options = [
    {
        examinationClassLabel:'01班',
        examinationClassValue:'1' ,
        score:'1'
    },{
        examinationClassLabel:'02班',
        examinationClassValue:'2' ,
        score:'2'
    },{
        examinationClassLabel:'03班',
        examinationClassValue:'3' ,
        score:'3'
    },{
        examinationClassLabel:'04班',
        examinationClassValue:'4' ,
        score:'1'
    },{
        examinationClassLabel:'05班',
        examinationClassValue:'5' ,
        score:'1'
    },
    {
        examinationClassLabel:'15班',
        examinationClassValue:'15' ,
        score:'2'
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
        this.props.handleBodyUpdateClassList([...options]) ;
    }

    handleBodyChangeExaminationStatus(index,value){
        return (e) =>{
            this.props.handleBodyChangeExaminationStatus(index,value) ;
        }
    }
    handleBodyChangeAllStatus(value){
        return (e) =>{
            this.props.handleBodyChangeAllStatus(value) ;
        }
    }

    renderTableHeader(){
        return (
            <tr>
                <th></th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label y-hand"
                          style={{backgroundColor: "#a9823e"}}
                          onClick={this.handleBodyChangeAllStatus('1')}
                    >优秀</span>
                </th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label label-success y-hand"
                          onClick={this.handleBodyChangeAllStatus('2')}
                    >合格</span>
                </th>
                <th align="center" style={{textAlign: "center"}}>
                    <span className="label label-danger y-hand"
                          onClick={this.handleBodyChangeAllStatus('3')}
                    >不合格</span>
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
                        <input type="checkbox" className="y-examination-class"/>
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

    render() {
        return (
            <div className="y-body">
                <table className="table">
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>

            </div>
        ) ;
    }
}

export default ExaminationBody ;