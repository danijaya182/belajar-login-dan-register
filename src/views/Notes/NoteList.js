import React from 'react';
import { Link } from 'react-router-dom'

class NoteList extends React.Component {
    render() {
        return (
            <div className="list">
                {this.props.notes.map((note) => {
                    return (
                        <div key={note.id}>
                            <p>
                                {note.name}
                            </p>
                            {this.props.isAuthenticated ?
                                <div>
                                    <Link to={"/view/" + note.id}>View</Link><span />
                                    <Link to={"/edit/" + note.id}>Edit</Link><span />
                                    <button onClick={() => this.props.onDelete(note.id)}>Delete</button>
                                </div>
                                :
                                null}
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default NoteList;