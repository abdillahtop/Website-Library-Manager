import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { Logout } from '../publics/redux/action/users'
import Swal from 'sweetalert2'

import ModalLogin from '../modal/modalLogin'
import './index.css'
const dataUser = JSON.parse(localStorage.getItem('data')) || ''

class navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
        }
    }

    Logout() {
        const userid = dataUser.id_user
        this.props.dispatch(Logout(userid))
        this.setState({
            users: this.props.user
        })
        Swal.fire({
            type: 'success',
            title: `Log Out Success`,
            confirmButtonText:
                '<a href="/" class="butSweet">OK</a>'
        })

    }
    render() {

        return (
            <div className="navbar">
                <div className="container">
                    <div style={{ marginLeft: '5%' }}>
                        <Link to={'/'}>
                            <h6 className="navbar-text">LIBRARY</h6>
                        </Link>
                    </div>
                    {dataUser.role === 'admin'
                        ?
                        <div style={{ float: 'right', marginRight: '5%', marginTop: '-15px' }}>
                            <ul style={{ display: 'flex', listStyle: 'none', marginTop: '5px' }}>
                                <li> <Link to={'/alluser'}> <Button outline color="secondary">Users</Button></Link></li>
                                <li> <Link to={'/loan'}> <Button outline color="success">Peminjam</Button></Link></li>
                                <li> <Button onClick={() => this.Logout()} outline color="danger">Log Out</Button></li>
                            </ul>
                        </div>
                        :
                        dataUser.role === 'user'
                            ?
                            <div style={{ float: 'right', marginRight: '5%', marginTop: '-15px' }}>
                                <ul style={{ display: 'flex', listStyle: 'none' }}>
                                    <li><p>Selamat datang <b>{dataUser.fullname}</b></p></li>
                                    <li><i onClick={() => this.Logout()} class="fas fa-sign-out-alt fa-1x"></i></li>
                                </ul>
                            </div>
                            :
                            <div style={{ float: 'right', marginRight: '5%', marginTop: '-20px' }}>
                                <ModalLogin />
                            </div>
                    }

                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        book: state.book,
    };
};

export default connect(mapStateToProps)(navbar);