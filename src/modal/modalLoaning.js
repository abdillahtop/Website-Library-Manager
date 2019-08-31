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
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { postLoaning, getLoaning } from '../publics/redux/action/loaning'

class ModalLoaning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            loanings: []

        };
        this.toggle = this.toggle.bind(this);
        this.addLoaning = this.addLoaning.bind(this);
    }

    componentDidMount = async () => {
        await this.props.dispatch(getLoaning())
        this.setState({
            books: this.props.book
        })
    }

    addLoaning(bookid, no_ktp, name) {
        this.props.dispatch(postLoaning(bookid, no_ktp, name))
        this.setState({
            loanings: this.props.loaning
        })
        if (this.state.bookid === undefined | this.state.no_ktp === undefined | this.state.name === undefined) {
            Swal.fire({
                title: 'Buku Belum dapat dipinjam',
                type: 'error',
                html: '<b> Pastikan data yang anda inputkan benar </b>'
            })
        } else {
            Swal.fire({
                title: 'Buku Berhasil dipinjam!',
                type: 'success',
                html: '<b>Selamat membaca sahabat, semoga bermanfaat!/b>',
            }).then(() => {
                this.toggle()
            })
        }
    }

    toggle() {
        console.log("salam dari toogle :", this.props.data ? this.props.data.book_name : '')
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    render() {
        const dataUser = JSON.parse(localStorage.getItem('data')) || ''
        return (
            <div style={{ display: 'inline-block' }}>
                <div {...this.props}>

                    <button
                        id="pinjam"
                        className="btn btn-success pinjam"
                        disabled={this.props.data ? this.props.data.status === "Tidak tersedia" : "Tersedia"}
                        onClick={this.toggle}
                    >
                        Pinjam
                    </button>
                    <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>

                        <ModalHeader toggle={this.toggle}>Masukkan ID Card</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label sm={3} size="lg">Title</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="id_book"
                                            placeholder="Title.."
                                            bsSize="lg"
                                            defaultValue={this.props.data ? this.props.data.id_book : ''}
                                            onChange={(e) => this.setState({ bookid: e.target.value })} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3} size="lg">ID Card</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="number"
                                            name="book_name"
                                            placeholder="ID card.."
                                            bsSize="lg"
                                            defaultValue={dataUser.user_id}
                                            onChange={(e) => this.setState({ no_ktp: e.target.value })} />
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label sm={3} size="lg">Name</Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="Name"
                                            placeholder="Name.."
                                            bsSize="lg"
                                            defaultValue={dataUser.full_name}
                                            onChange={(e) => this.setState({ name: e.target.value })} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <button className="buttonSave" color="warning" onClick={() => this.addLoaning(this.state.bookid, this.state.no_ktp, this.state.name)} >Save</button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        loaning: state.loaning,
        book: state.book
    };
};

export default connect(mapStateToProps)(ModalLoaning);