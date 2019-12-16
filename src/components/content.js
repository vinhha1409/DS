import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import ContentItem from './content-item';

class Content extends Component {
    render() {
        const { movies } = this.props;
        let content = undefined;
        if(movies){
            content = movies.map((movie, index) => {
                return <ContentItem
                    key={index}
                    index={index}
                    movie={movie}
                    onAddHis={this.props.onAddHis}
                />
            });
        }else{
            content = "Nothing yet";
        }

        return (
            <div className="content">
                <Row>
                    {content}
                </Row>
            </div>
        )
    }
}
export default Content;
