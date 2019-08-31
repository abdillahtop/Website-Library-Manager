import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { updateBook } from '../publics/redux/action/book'
import './index.css'

class ModalUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            updates: []
        };
        this.toggle = this.toggle.bind(this);

    }

    editClick(data) {
        this.props.dispatch(updateBook(this.props.match.params.bookid, data))
        this.setState({
            updates: this.props.update
        })
        Swal.fire({
            type: 'success',
            title: `Data Berhasil diupdate!`,
            showCloseButton: true,
            showConfirmButton: false,
            // footer: '<a href>Why do I have this issue?</a>'
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const { books } = this.state
        const list = books.bookList

        return (
            <div>
                <div>
                    <text onClick={this.toggle}>Edit</text>
                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Update Data</ModalHeader>
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
                                            defaultValue={list ? list.book_name : ''}
                                            onChange={(e) => this.setState({ book_name: e.target.value })} />
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
                                            defaultValue={list ? list.writter : ''}
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
                                            type="text"
                                            name="image"
                                            placeholder="Url Image.."
                                            bsSize="lg"
                                            value={list ? list.image : ''}
                                            onChange={(e) => this.setState({ image: e.target.value })} />
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
                                            <option>1 anak-anak</option>
                                            <option>2 novel</option>
                                            <option>3 teknik</option>
                                            <option>4 arsitektur&design</option>
                                            <option>5 pengetahuan</option>
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
                                            defaultValue={list ? list.description : ''}
                                            onChange={(e) => this.setState({ description: e.target.value })} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3} size="lg">Status</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="select"
                                            name="status"
                                            bsSize="lg"
                                            onChange={(e) => this.setState({ status: e.target.value })} >
                                            <option>---Pilih Status---</option>
                                            <option>Tersedia</option>
                                            <option>Tidak Tersedia</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <button className="buttonSave" color="warning" onClick={() => this.editClick(this.state.book_name, this.state.writter, this.state.location, this.state.image, this.state.id_category, this.state.description, this.state.status)} > Save</button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        upadate: state.update
    };
};

export default connect(mapStateToProps)(ModalUpdate);