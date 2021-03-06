import React, { Component } from 'react';
import { Table, Spinner } from 'reactstrap';
import Navbar from '../components/navbar'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { getLoaningUser } from '../publics/redux/action/loaning'
const dataUser = JSON.parse(localStorage.getItem('data')) || 'Anda Belum Login Bosku'

class CekLoanUser extends Component {
    state = {
        loanings: [],
        loading: true
    }

    componentDidMount = async () => {
        const cardid = dataUser.id_card
        const Token = dataUser.token
        const userid = dataUser.id_user
        await this.props.dispatch(getLoaningUser(cardid, Token, userid))
            .then(() => {
                this.setState({
                    loanings: this.props.loaning,
                    loading: false
                });
            })
    };

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
        const { loanings, loading } = this.state
        const list = loanings.loaningList
        console.log("loan all :", list)
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container " style={{ marginTop: '100px', justifyItems: 'center' }}>

                    <Table className="col-md-12 ml-4 table-responsive" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                            loading
                                ?
                                <div className="App-loading">
                                    <Spinner color="success" />
                                </div>
                                :
                                dataUser.role === "user"
                                    ?
                                    <div>
                                        <thead>
                                            <tr >
                                                <th >Title</th>
                                                <th>Date Borrow</th>
                                                <th>Date Return</th>
                                                <th>Forfeit</th>
                                            </tr>
                                        </thead>
                                        {

                                            list &&
                                            list.length > 0 &&
                                            list.map((entry, index) => {

                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{entry.title}</td>
                                                            <td>{this.formatDate(entry.borrow_date)}</td>
                                                            <td>{this.formatDate(entry.expaired)}</td>
                                                            <td>{entry.forfeit}</td>
                                                        </tr>


                                                    </tbody>
                                                )

                                            })

                                        }
                                    </div>
                                    :
                                    <div>
                                        <thead>
                                            <tr >
                                                <th >Title</th>
                                                <th>Date Borrow</th>
                                                <th>Date Return</th>
                                                <th>Forfeit</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <h1>Anda Belum Meminjam Apapun</h1>
                                            </tr>
                                        </tbody>
                                    </div>

                        }
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loaning: state.loaning
    };
};

export default connect(mapStateToProps)(CekLoanUser);