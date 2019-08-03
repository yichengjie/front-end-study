import React,{Component} from 'react' ;

let options = [
    {
        nameAndNo:"白婷羽11182762",
    },{
        nameAndNo:"张三11182763",
    },{
        nameAndNo:"李四11182764",
    },{
        nameAndNo:"王五11182765",
    },{
        nameAndNo:"赵六11182766",
    }
] ;

class EvaluationBody  extends Component{

    renderTableHeader(){
        let {list} = this.props.confInfo ;
        return (
            <tr>
                <th width="109" style={{textAlign:'center'}} >姓名/学号</th>
                {
                    list.map((item,index)=>{
                        return <th key={index} style={{textAlign:'center'}}>{item}</th> ;
                    })
                }
            </tr>
        ) ;
    }

    renderTbody(){
        let {list} = this.props.confInfo ;
        return options.map((item,index) =>{
            return (
                <tr key={index}>
                    <td align="center">{item.nameAndNo}</td>
                    {
                        list.map((item,index)=>{
                            return <td key={index} align="center"><input type="checkbox" /></td> ;
                        })
                    }
                </tr>
            ) ;
        }) ;

    }


    render() {
        let {classType,itemType,list} = this.props.confInfo ;
        return (
            <div className="y-body">
                <div className="y-title">评价学生&nbsp;:</div>
                <table className="table table-bordered table-striped">
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTbody()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EvaluationBody ;

