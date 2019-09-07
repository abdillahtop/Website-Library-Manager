import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { detailBook, deleteBook, updateBook } from '../publics/redux/action/book'
import { postLoaning } from '../publics/redux/action/loaning'
import './index.css'
const dataUser = JSON.parse(localStorage.getItem('data')) || ''

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: true,
            books: [],
            updates: [],
        };
        this.deleteClick = this.deleteClick.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    componentDidMount = async () => {
        await this.props.dispatch(detailBook(this.props.match.params.bookid))
        this.setState({
            books: this.props.book,
            loading: false
        })
    }

    deleteClick() {
        this.props.dispatch(deleteBook(this.props.match.params.bookid))
            .then(() => {
                this.setState({
                    books: this.props.book,
                })
                setTimeout(() => {
                    window.location.href = '/'
                }, 500);

                Swal.fire({
                    title: 'Buku Berhasil Dihapus!',
                    type: 'success',
                })
            })
    }

    addLoaning(data) {
        this.props.dispatch(postLoaning(data))
            .then(() => {
                this.toggle()
                this.setState({
                    loanings: this.props.loaning
                })
                setTimeout(() => {
                    window.location.reload()
                }, 500);

                Swal.fire({
                    title: 'Buku Berhasil dipinjam!',
                    type: 'success',
                    html: '<b>Selamat membaca sahabat, semoga bermanfaat!</b>',
                })
            })
            .catch(() => {
                this.toggle()
                Swal.fire({
                    title: 'Buku Gagal dipinjam!',
                    type: 'warning',
                    html: '<b>Mohon Maaf Peminjaman Gagal!</b>',
                })
            })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    editClick(book_name, writter, location, image, id_category, description, status) {
        this.props.dispatch(updateBook(this.props.match.params.bookid, book_name, writter, location, image, id_category, description, status))
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

    // ---- Fromat Date -----
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
        const { books, loading } = this.state
        const list = books.bookList
        const data = {
            id_book: list ? list.id_book : '',
            id_card: dataUser.id_card,
            name: dataUser.fullname
        }
        return (
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
                {
                    loading
                        ?
                        <div className="App-loading">
                            <Spinner color="success" />
                        </div>
                        :
                        <>
                            <section>
                                {dataUser.role === 'admin'
                                    ?
                                    <div className="box">
                                        <ul className="navLink">
                                            <li><Link className="textLink" to={'/'}>Back</Link></li>
                                            <li><Link className="textLink" onClick={this.toggle}>Edit</Link></li>
                                            <li><Link className="textLink"
                                                onClick={() => this.deleteClick()}>Delete</Link></li>
                                        </ul>
                                    </div>
                                    :
                                    <div>
                                        <div className="box">
                                            <ul className="navLink">
                                                <li><Link className="textLink" to={'/'}><i class="fas fa-arrow-alt-circle-left fa-2x"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>

                                }

                                <img className="cover" src={list ? list.image : ''} alt=".." />
                                <img className="imgThum" src={list ? list.image : ''} alt=".." />
                            </section>
                            <section>

                                {
                                    dataUser.role === 'user'
                                        ?

                                        <div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                                            {dataUser.is_verified === 1
                                                ?
                                                <button
                                                    className="btn btn-success"
                                                    style={{ margin: '20px 0' }}
                                                    onClick={() => this.addLoaning(data)}
                                                    disabled={list ? list.status === "Tidak tersedia" : "Tersedia"}
                                                >
                                                    Pinjam
                            </button>
                                                :
                                                <text>Veritifikasi dulu bro</text>

                                            }
                                            <h1 className="font" >{list ? list.title : ''}</h1>
                                            <h3>{list ? list.writter : ''}</h3>
                                            <h6 className="tgl">{this.formatDate(list ? list.updated_at : '')}</h6>
                                            <ul className="tambahandetail">
                                                <li><h5 className="category">{list ? list.category_name : ''}</h5></li>
                                                <li><h5 className="location">{list ? list.location : ''}</h5></li>
                                                <li><h5 className="status">{list ? list.status : ''}</h5></li>
                                            </ul>
                                            <p className="textDesc" >{list ? list.description : ''}</p>
                                        </div>
                                        :
                                        <div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                                            <h1 className="font" >{list ? list.title : ''}</h1>
                                            <h3>{list ? list.writter : ''}</h3>
                                            <h6 className="tgl">{this.formatDate(list ? list.updated_at : '')}</h6>
                                            <ul className="tambahandetail">
                                                <li><h5 className="category">{list ? list.category_name : ''}</h5></li>
                                                <li><h5 className="location">{list ? list.location : ''}</h5></li>
                                                <li><h5 className="status">{list ? list.status : ''}</h5></li>
                                            </ul>
                                            <p className="textDesc" >{list ? list.description : ''}</p>
                                        </div>
                                }
                            </section>
                        </>
                }

            </div>)
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
        upadate: state.update
    };
};

export default connect(mapStateToProps)(Detail);