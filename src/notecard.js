import React from 'react';


export default class NoteCard extends React.Component{
    constructor(){
        super();
        this.state = {
            editing: false,
            note: {}
        }
    }
    
    componentDidMount(){
        this.setState({
            note: this.props.note
        })
    }
    render(){
        return(
 <div className="column is-3 note card-bg">
                <div className="is-clearfix">
                    <span className='title is-4'>{this.state.note.title}</span>
                    <i className="fa fa-times is-pulled-right" onClick={()=> this.props.removeNote(this.state.note.key)}></i>
                    <i className="fa fa-edit is-pulled-right" onClick={()=> { this.setState({editing:true}) }}></i>
                    <hr/>
                </div>
                <p>{this.state.note.text}</p>
</div>

    )
    }
}