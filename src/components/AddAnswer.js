import React, {Component} from 'react';

export default class AddAnswer extends Component {
    API_URL = process.env.REACT_APP_API;


    constructor(props) {
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            parentId: this.props.match.params.id,
            text: String,
            rating: 0,
        }
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("PARENT ID: " + this.props.match.params.id);
        console.log("TEXT: " + this.state.text);
        console.log("RATING: " + this.state.rating);

        fetch(`${this.API_URL}/answers/add-answer/` + this.props.match.params.id, {
            method: 'POST',
            body: JSON.stringify({
                parentId: this.props.match.params.id,
                text: this.state.text,
                rating: this.state.rating
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res => console.log(res))
            .catch(e => console.log(e));
        this.props.history.push("/questions/" + this.props.match.params.id);
        // window.location.reload()
    }

    render() {
        return (
            <div>
                <h3 className="bg-dark text-light p-3 mb-3 rounded">Add answer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Your Answer</label>
                        <input  type="text"
                                name="text"
                                className="form-control"
                                placeholder="Answer..."
                                onChange={this.onChangeText}
                                required
                        />
                        <input className="btn btn-success mt-4 mb-3 ml-2" type='submit' value='Submit Answer'/>
                    </div>
                </form>
            </div>
        )
    }

}