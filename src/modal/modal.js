import React, { Component } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col
} from 'reactstrap'
import './index.css'
import swal from 'sweetalert2'
import { connect } from 'react-redux'
import { postBook } from '../publics/redux/action/book'

class Modals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            categorys: [],
            title: '',
            writter: '',
            image: '',
            description: ''
        };
        this.toggle = this.toggle.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this)
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            image: e.target.files[0],
            loaded: 0,
        })
    }

    addBook = async (event) => {
        event.preventDefault()
        if (this.state.title === '' || this.state.writter === '' || this.state.image === '' || this.state.description === '') {
            swal.fire({
                title: 'Add Book Failed',
                type: 'warning',
                text: 'Failed add data, please fill the blank form correctly!'
            })
        } else {
            let formdata = new FormData()
            formdata.append('title', this.state.title)
            formdata.append('writter', this.state.writter)
            formdata.append('image', this.state.image)
            formdata.append('description', this.state.description)
            formdata.append('location', this.state.location)
            formdata.append('id_category', this.state.id_category)
            await this.props.dispatch(postBook(formdata))
                .then(() => {
                    swal.fire({
                        title: 'Add Book',
                        type: 'success',
                        text: 'Data added successfully!',
                    })
                    this.setState({
                        books: this.props.book,
                        title: '',
                        writer: '',
                        description: ''
                    })
                })
                .catch(() => {
                    swal.fire({
                        title: 'Add Book Failed',
                        type: 'warning',
                        text: 'Title does exist!',
                    })
                    this.setState({
                        title: '',
                        writer: '',
                        description: ''
                    })
                })
        }

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div>
                    <button className="btn btn-success" style={{ borderRadius: '5px' }} onClick={this.toggle}><i class="fas fa-plus-square"></i></button>
                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
                        <ModalBody>
                            <Form>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Title</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="book_name"
                                            placeholder="Title.."
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ title: e.target.value })} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Writter</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="writter"
                                            placeholder="Writter.."
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ writter: e.target.value })} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Location</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="select"
                                            name="location"
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ location: e.target.value })}>
                                            <option>---Pilih Lokasi---</option>
                                            <option>lantai 1, Rak A</option>
                                            <option>lantai 1, Rak B</option>
                                            <option>lantai 1, Rak C</option>
                                            <option>lantai 2, Rak A</option>
                                            <option>lantai 2, Rak B</option>
                                        </Input>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Url Image</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="file"
                                            name="image"
                                            placeholder="Url Image.."
                                            bsSize="lg"
                                            onChange={this.onChangeFile} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Category</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="select"
                                            name="id_category"
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ id_category: e.target.value })}>
                                            <option>---Pilih Category---</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3} size="lg">Description</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            placeholder="Description.."
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ description: e.target.value })} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-success" onClick={this.addBook}>Add Book</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
    };
};

export default connect(mapStateToProps)(Modals);