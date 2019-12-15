import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

class SeacrhBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        }, () =>{
            this.props.onSearch(this.state.keyword)
        })
       
    }
    render() {
        let { keyword } = this.state
        return (
            < div className="filter-button" >
                <Row>
                    <Col lg={4}>
                        <InputGroup className="action-btn">
                            <FormControl
                                name="keyword"
                                placeholder="Input keyword..."
                                value={keyword}
                                onChange={this.onChange} 
                                />
                        </InputGroup>
                    </Col>
                    <Col lg={2}>
                        
                    </Col>
                    <Col lg={2}>
                        <Button className="action-btn" variant="primary" onClick={this.props.onRecommend}>Recommend</Button>
                    </Col>
                    <Col lg={2}>
                        <Button className="action-btn" variant="primary" onClick={this.props.onShowHis}>Show history</Button>
                    </Col>
                    <Col lg={2}>
                        <Button className="action-btn" variant="danger" onClick={this.props.onClearHis}>Clear history</Button>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default SeacrhBar;