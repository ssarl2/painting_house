import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    state = {
        boardNo: 1,
        boards: [
            {
                boardno: 0,
                boardtype:'CV'
            }
        ]
    }

    saveData = (data) => {
        let boards = this.state.boards;
        if(data.boardno === null || data.boardno === '' || data.boardno(undefined)) {
            this.setState({
                boardNo: this.state.boardNo+1,
                boards: boards.concat({
                    boardno: this.state.boardNo,
                    boardtype: data.boardtype
                })
            });
        } else {
            this.setState({
                boards: boards.map(row => data.boardNo === row.boardNo ? {...data} : row)
            })
        }
    }

    seleteRow = (row) => {
        this.child.current.seleteRow(row);
    }

    render() {
        const { boards } = this.state;

        return (
            <div>
                <boardForm></boardForm>
            </div>
        )
    }
}

class BasicBox extends Components {


}
