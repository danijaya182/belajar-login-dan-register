import React from 'react';

class NoteList extends React.Component {
    render() {
        return (
            <div className="list">
              {
                  this.props.notes.map((note,index)=> {
                   return <p key={note.id}>{note.name}</p>
                  })
                }
            </div>
        )
    }
}


export default NoteList;