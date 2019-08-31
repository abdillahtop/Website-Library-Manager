import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux'
import { postRegister } from '../publics/redux/action/users'
import NavLogin from '../components/navbar'
import './index.css'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: [],
            id_card: '',
            email: '',
            fullname: '',
            password: ''
        };
    }

    // componentDidMount = async () => {
    //     await this.props.dispatch(detailBook(this.props.match.params.bookid))
    //     this.setState({
    //         books: this.props.book
    //     })
    // }

    newUser(data) {
        this.props.dispatch(postRegister(data))
        this.setState({
            registers: this.props.register
        })
        Swal.fire({
            type: 'success',
            title: `Daftar Berhasil`,
            showCloseButton: true,
            showConfirmButton: false
        })
    }

    render() {
        const { id_card, email, fullname, password } = this.state
        // const list = registers.userList

        let data = {
            id_card: this.state.id_card,
            email: this.state.email,
            fullname: this.state.fullname,
            password: this.state.password
        }

        return (
            <div>
                <NavLogin />
                <Form style={{ marginTop: '100px' }}>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <h3 style={{ textAlign: 'center' }}>Sign Up</h3>
                            <FormGroup Row>
                                <Label for="Email">Id Card</Label>
                                <Input
                                    type="number"
                                    name="idCard"
                                    id="idCard"
                                    placeholder="Number..."
                                    value={id_card}
                                    onChange={(e) => this.setState({ id_card: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup Row>
                                <Label for="Email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="Email"
                                    placeholder="Email..."
                                    value={email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup Row>
                                <Label for="Fullname">Full name</Label>
                                <Input
                                    type="text"
                                    name="fullname"
                                    id="Fullname"
                                    placeholder="fullname..."
                                    value={fullname}
                                    onChange={(e) => this.setState({ fullname: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup Row>
                                <Label for="Password">Password</Label>
                                <Input
                                    type="password"
                                    name="Password"
                                    id="Password"
                                    placeholder="Password..."
                                    value={password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </FormGroup>
                            <Button color="success" style={{ float: 'right' }} onClick={() => { this.newUser(data) }}>Sign Up</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        register: state.register,
    };
};

export default connect(mapStateToProps)(Register);