import React, { Component } from 'react'
// import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { Table } from 'reactstrap';
import Swal from 'sweetalert2'
import Nav from '../components/navbar';
import { getUser, delUser, verifiedUser } from '../publics/redux/action/users'

import './index.css'

class IsUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            delUsers: []
        }
    }

    componentDidMount = async () => {
        const dataUser = JSON.parse(localStorage.getItem('data'))
        const Token = dataUser.token
        const userid = dataUser.id_user
        // console.log("from didmount :", userid)
        await this.props.dispatch(getUser(Token, userid))
        this.setState({
            allUsers: this.props.users
        })
    }

    deleteUser(userid) {
        this.props.dispatch(delUser(userid))
        this.setState({
            delUsers: this.props.delUser
        })
        Swal.fire({
            type: 'success',
            title: `User Berhasil dihapus`,
            confirmButtonText:
                '<a href="/alluser" class="butSweet">OK</a>'
        })
    }

    Verified(userid) {
        this.props.dispatch(verifiedUser(userid))
        this.setState({
            allUsers: this.props.users
        })
        Swal.fire({
            type: 'success',
            title: `User Berhasil diveritifikasi`,
            confirmButtonText:
                '<a href="/alluser" class="butSweet">OK</a>'
        })
    }

    formatDate(date) {
        let data = Date.parse(date);
        let newDate = new Date(data);
        let day = newDate.getDate();
        let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        let month = months[newDate.getMonth()];
        let year = newDate.getFullYear();
        return `${day} ${month} ${year}`
    }

    render() {
        const { allUsers } = this.state
        const list = allUsers.userList
        console.log("userlist", list)
        return (
            <div>
                <Nav />
                <div className="container table-responsive " style={{ marginTop: '3em' }}>
                    <div className="col row justify-content-md-center">
                        <Table >

                            <div >
                                <thead>
                                    <tr>
                                        <th >Id User</th>
                                        <th>Id Card</th>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th >Last Login</th>
                                        <th >Created At</th>
                                        <th>Verify User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {list &&
                                    list.length > 0 &&
                                    list.map((entry, index) => {
                                        console.log("map", entry)
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{entry.id_user}</td>
                                                    <td>{entry.id_card}</td>
                                                    <td>{entry.fullname}</td>
                                                    <td>{entry.email}</td>
                                                    <td>{this.formatDate(entry.updated_at)}</td>
                                                    <td>{this.formatDate(entry.created_at)}</td>
                                                    {
                                                        entry.is_verified === 0
                                                            ?
                                                            <th><button class="btn btn-success" onClick={() => this.Verified(entry.id_user)}>Verify</button></th>
                                                            :
                                                            <th><button class="btn btn-secondary " disabled >Verify</button></th>
                                                    }<th><button onClick={() => this.deleteUser(entry.id_user)} className="danger"><i class="fas fa-trash"></i></button></th>
                                                </tr>
                                            </tbody>
                                        )

                                    })
                                }
                            </div>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.users,
        delUser: state.delUser
    };
};

export default connect(mapStateToProps)(IsUser);