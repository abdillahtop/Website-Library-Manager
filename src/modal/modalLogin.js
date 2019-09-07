import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, Spinner } from 'reactstrap'
import { connect } from 'react-redux'
import { postLogin } from '../publics/redux/action/users'
import Swal from 'sweetalert2'
import './index.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            signs: [],
            loading: false,
            loading: false,
            datas: [],
            email: '',
            password: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    isLogin = async (data) => {
        this.setState({ loading: true })
        const email = this.state.email
        const password = this.state.password
        if (email === '' && password === '') {

        } else {
            this.props.dispatch(postLogin(data))
                .then(() => {
                    Swal.fire({
                        type: 'success',
                        title: `Selamat Datang`,
                        showConfirmButton: false,
                    })
                    this.toggle()
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1000);
                    this.setState({
                        signs: this.props.sign,
                        loading: false
                    })
                })
                .catch(() => {
                    this.toggle()
                    Swal.fire({
                        type: 'error',
                        title: `Email atau Password salah`
                    })
                    this.setState({
                        loading: false
                    })
                })
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            email: '',
            password: ''
        }));
    }

    render() {
        const { datas, email, password, loading } = this.state
        const dataUser = datas.userList
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        return (
            <div style={{ display: 'inline-block', verticalAlign: 'center' }}>
                {
                    loading
                        ?
                        <div className="App-loading">
                            <Spinner color="success" />
                            <text>Mohon Tunggu</text>
                        </div>
                        :
                        <div>
                            <div className="login" onClick={this.toggle}>
                                <i class="fas fa-user-alt" style={{ marginRight: '10px' }}></i>
                                <h6 style={{ float: 'right' }}>Login</h6>
                            </div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        {
                                            dataUser && dataUser.length > 0 && dataUser.map((entry, index) => {
                                                return (
                                                    <text>{entry.token}</text>
                                                )
                                            })
                                        }
                                        <FormGroup >
                                            <Label sm={3} size="lg">Email</Label>
                                            <Col>
                                                <Input
                                                    type="text"
                                                    name="Email"
                                                    placeholder="Email..."
                                                    bsSize="lg"
                                                    value={email}
                                                    onChange={(e) => this.setState({ email: e.target.value })} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label sm={3} size="lg">Password</Label>
                                            <Col >
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password..."
                                                    bsSize="lg"
                                                    value={password}
                                                    onChange={(e) => this.setState({ password: e.target.value })} />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <Label sm={10} size="lg">If you didn't have account sign up <a href="/register">here</a></Label>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="buttonLogin" color="success" onClick={() => this.isLogin(data)}>Login</button>{' '}
                                </ModalFooter>
                            </Modal>
                        </div>
                }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        sign: state.sign,
    };
};

export default connect(mapStateToProps)(Login);