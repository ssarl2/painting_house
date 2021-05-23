// https://forest71.tistory.com/187
import React, { Component } from 'react';

class mine extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    state = {
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: 'Someone1',
                brdtitle: 'When will you come?',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'Someone2',
                brdtitle: 'Milloin tulet tänne?',
                brddate: new Date()
            }
        ]
    }

    handleSaveData = (data) => {
        let boards = this.state.boards;
        if (data.brdno === null || data.brdno === '' || data.brdno === undefined) {
            this.setState({
                maxNo: this.state.maxNo+1,
                boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), brdwriter: data.brdwriter, brdtitle: data.brdtitle })
            });
        } else {
            this.setState({
                boards: boards.map(raw => data.brdno === raw.brdno ? {...data }: raw)
            })
        }
    }

    handleRemove = (brdno) => {
        this.setState({
            boards: this.state.boards.filter(raw => raw.brdno !== brdno)
            // if brdno is 3, 1 ~ 4 are brdnos in this state
            // if one of brdnos are not matching with brdno, it will be excluded
            // recompose the brdnos except brdno to the boards
        })
    }

    handleSelectRow = (raw) => {
        this.child.current.handleSelectRow(raw);
    }

    render() {
        const { boards } = this.state;

        return (
            <div>
                <BoardForm onSaveData={this.handleSaveData} ref={this.child}/>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(raw =>
                            (<BoardItem key={raw.brdno} raw={raw} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                            // What is onRemove.
                            // this.handleRemove is in this class
                            // onRemove is a variable in BoardItem
                            // this.handleRemove in this class will be called in handelRemove property in BoardItem as a callback
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
class BoardItem extends React.Component {
    handleRemove = () => {
        const { raw, onRemove } = this.props;
        onRemove(raw.brdno);
    }
    handleSelectRow = () => {
        const { raw, onSelectRow } = this.props;
        onSelectRow(raw);
    }
    render() {
        console.log(this.props.raw.brdno);
        return(
            <tr>
                <td>{this.props.raw.brdno}</td>
                <td><a onClick={this.handleSelectRow}>{this.props.raw.brdtitle}</a></td>
                <td>{this.props.raw.brdwriter}</td>
                <td>{this.props.raw.brddate.toLocaleDateString('ko-KR')}</td>
                <td><button onClick={this.handleRemove}>X</button></td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        brdwriter:'',
        brdtitle:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectRow = (raw) => {
        this.setState(raw);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveData(this.state);
        this.setState({
            brdno:'',
            brdwriter:'',
            brdtitle:''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default mine;
