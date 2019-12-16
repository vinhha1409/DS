import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

class ContentItem extends Component {
    onAddHis = () =>{
        this.props.onAddHis(this.props.movie);
    }
    render() {
        var {movie} = this.props;
        return (
            <Col lg={3}>
                <Card className="movie-card" >
                    <Card.Img style={{objectFit: 'scale-down'}} variant="top" className="item-img" src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + movie.poster_path} />
                    <Card.Body>
                        <Card.Title style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{movie.original_title}</Card.Title>
                        <Button onClick={this.onAddHis}>Watch</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};

export default ContentItem;
