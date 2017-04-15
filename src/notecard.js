import React from 'react';

export default class NoteCard extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      note: {}
    }
  }

  render() {
    return (
      <div className="column is-3 note card-bg animated fadeInUp">
        <div className="is-clearfix">
          <span className='title is-4'>{this.props.note.title}</span>
          <i
            className="fa fa-times is-pulled-right"
            onClick={() => this.props.removeNote(this.props.note.key)}></i>
          <i
            className="fa fa-edit is-pulled-right"
            onClick={() => {
            this.setState({editing: true})
          }}></i>
          <hr/>
        </div>
        <p>{this.props.note.text}</p>
       <p className='date'>{this.props.note.date}</p>
      </div>

    )
  }
}