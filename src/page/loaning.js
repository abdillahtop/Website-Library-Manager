import React, { Component } from 'react';
import { Table, Spinner } from 'reactstrap';
import Navbar from '../components/navbar'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { getLoaning, updateLoaning } from '../publics/redux/action/loaning'
const dataUser = JSON.parse(localStorage.getItem('data')) || 'Anda Belum Login Bosku'

class cekLoan extends Component {
    state = {
        loanings: [],
        loading: true
    }

    componentDidMount = async () => {
        const Token = dataUser.token
        const userid = dataUser.id_user
        await this.props.dispatch(getLoaning(Token, userid))
        this.setState({
            loanings: this.props.loaning,
            loading: false

        });
    };

    returnBook(loaningid, data) {
        this.props.dispatch(updateLoaning(loaningid, data))
            .then(() => {
                this.setState({
                    loanings: this.props.loaning
                })
                Swal.fire({
                    type: 'success',
                    title: `Buku Berhasil dkembalikan`,
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    window.location.href = '/'
                }, 500);
            })
            .catch(() => {
                Swal.fire({
                    type: 'error',
                    title: `Buku galgal dkembalikan`,
                })
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
        const { loanings, loading } = this.state
        const list = loanings.loaningList
        console.log("loan all :", list)
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container table-responsive" style={{ marginTop: '100px', justifyItems: 'center' }}>

                    <Table>
                        {
                            loading
                                ?
                                <div className="App-loading">
                                    <Spinner color="success" />
                                </div>
                                :
                                <div>
                                    <thead>
                                        <tr >
                                            <th>Title</th>
                                            <th>ID Card</th>
                                            <th>Name</th>
                                            <th>Forfeit</th>
                                            <th>Date Borrow</th>
                                            <th>Date Return</th>
                                            <th >Buton Return</th>
                                        </tr>
                                    </thead>
                                    {

                                        list &&
                                        list.length > 0 &&
                                        list.map((entry, index) => {
                                            let tgl = new Date()
                                            let hitung = 0
                                            let tanggal = tgl.getDate()
                                            let bulan = tgl.getMonth() + 1
                                            let expired = entry.expaired.split('-')
                                            let jmlHari = 0

                                            if (parseInt(bulan) > parseInt(expired[1])) {
                                                hitung += (parseInt(bulan) - parseInt(expired[1])) * 5000 * 30
                                                jmlHari += (parseInt(bulan) - parseInt(expired[1]) * 30)
                                            } else if (parseInt(bulan) === parseInt(expired[1]) && parseInt(tanggal) > parseInt(expired[2])) {
                                                hitung += (parseInt(tanggal) - parseInt(expired[2])) * 5000
                                                jmlHari += parseInt(tanggal) - parseInt(expired[2])

                                            }

                                            let data = {
                                                id_book: entry.id_book,
                                                id_card: entry.id_card,
                                                forfeit: hitung
                                            }

                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{entry.title}</td>
                                                        <td>{entry.id_card}</td>
                                                        <td>{entry.name}</td>
                                                        <td>{entry.forfeit}</td>
                                                        <td>{this.formatDate(entry.borrow_date)}</td>
                                                        <td>{this.formatDate(entry.expaired)}</td>
                                                        <td>
                                                            {entry.is_return === "False"
                                                                ?
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => this.returnBook(entry.id_pinjam, data)}
                                                                >
                                                                    Return
                                                    </button>
                                                                :
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    disabled
                                                                >
                                                                    Return
                                                    </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                    }
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

export default connect(mapStateToProps)(cekLoan);