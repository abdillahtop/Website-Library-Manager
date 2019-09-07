import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Button, Spinner } from 'reactstrap'
import { getBook, searchBook, getMoreBook } from '../publics/redux/action/book'
import Nav from '../components/navbar';
import Modal from '../modal/modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const dataUser = JSON.parse(localStorage.getItem('data')) || ''
console.log("datauser ", dataUser)
class Home extends Component {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loading: true,
            Tersedia: 'Tersedia',
            books: [],
            searchs: [],
            searching: '',
            page: 1
        }
    }

    componentDidMount = async (page) => {
        await this.props.dispatch(getBook())
            .then(() => {
                this.setState({
                    loading: false,
                    books: this.props.book,
                });
            })
        await this.props.dispatch(getMoreBook(page))
            .then(result => {
                console.log("getmore", result)
                this.setState({ loading: false })
            })
    };

    searchBook(search) {
        this.props.dispatch(searchBook(search))
        this.setState({
            searchs: this.props.book
        })
    }

    maxText(text) {
        if (text.length > 25) {
            let textSplit = text.substr(0, 25)
            return `${textSplit} ...`
        } else {
            let textSplit = text
            return `${textSplit}`
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { books, loading } = this.state;
        const list = books.bookList

        let next = async () => {
            this.setState({
                page: this.state.page + 1
            })
            const page = this.state.page
            await this.props.dispatch(getMoreBook(page + 1))
                .then(() => {
                    this.setState({
                        books: this.props.book
                    })
                })
        }

        let prev = async () => {
            this.setState({
                page: this.state.page - 1
            })
            const page = this.state.page
            await this.props.dispatch(getMoreBook(page - 1))
                .then(() => {
                    this.setState({
                        books: this.props.book
                    })
                })

        }

        console.log("booklist", list)
        return (
            <div>
                <Nav />
                <div className="container" style={{ marginTop: '50px' }}>
                    {
                        dataUser.role === 'admin'
                            ?
                            <div>
                                <div className="col-md-11">
                                    <Input placeholder="Search Books Here..." style={{ marginTop: '50px' }} className="searchAdmin" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                </div>
                                <div className="col-md-2" style={{ marginTop: '-40px', float: 'right', marginLeft: 20 }}>
                                    <Modal />
                                </div>
                                <div className="col-md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                    {
                                        loading
                                            ?
                                            <div className="App-loading">
                                                <Spinner color="success" />
                                            </div>
                                            :
                                            list.length === 0
                                                ?
                                                <text style={{ marginBottom: 20 }}>Anda Telah Mencapai item terakhir</text>
                                                :
                                                list &&
                                                list.length > 0 &&
                                                list.map((entry, index) => {
                                                    return (
                                                        <div key={index} className="boxs">
                                                            <Link style={{ textDecoration: 'none' }} to={`/book/${entry.id_book}`}>
                                                                <div>
                                                                    {
                                                                        entry.status === "Tersedia"
                                                                            ?
                                                                            <p className="statusViewAvail">{entry.status}</p>
                                                                            :
                                                                            <p className="statusViewNot">{entry.status}</p>
                                                                    }
                                                                    <img className="adjuctimgs" src={entry.image} alt="..." />
                                                                    <p className="catView">[ {entry.category_name}]</p>
                                                                    <p className="textViews">{this.maxText(entry.title)}</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                    }
                                </div>
                                <div className="row justify-content-md-center" style={{ marginTop: '-80px', paddingBottom: '100px', alignContent: 'center' }}>
                                    {
                                        list !== undefined
                                            ?
                                            <div className="col-md-6 offset-3">
                                                <Button
                                                    color='none'
                                                    className='btn btn-outline-success '
                                                    onClick={prev}
                                                    disabled={this.state.page < 2}

                                                >
                                                    Prev
                                     </Button>
                                                <text style={{ padding: '0 25px' }}>{this.state.page}</text>
                                                <Button
                                                    color='none'
                                                    className='btn btn-outline-success'
                                                    onClick={next}
                                                    disabled={list.length === 0}
                                                >
                                                    Next
                                    </Button>

                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                            :
                            dataUser.role === 'user'
                                ?
                                <div className='row' style={{ marginTop: '50px' }}>
                                    <div className="col-md-2">
                                        <div style={{ width: '110%', height: 'auto', border: '1px solid #999', padding: '10px' }}>
                                            <div>
                                                <h5 style={{ textAlign: 'center' }}>Detail User</h5>
                                                <img style={{ width: '100%', padding: '0 10%', marginBottom: '10px' }} src="https://image.flaticon.com/icons/svg/219/219983.svg" alt="profile" />
                                                <p>ID Card : {dataUser.id_card}</p>
                                                <p>Email : {dataUser.email}</p>
                                                <Link to={`/loan/${dataUser.id_card}`}><button style={{ marginTop: '10px' }} className="btn btn-success">Riwayat Pinjaman</button></Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-10">
                                        <div className="col-md-12">
                                            <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                        </div>
                                        <div className="col-md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                            {
                                                loading
                                                    ?
                                                    <div className="App-loading">
                                                        <Spinner color="success" />
                                                    </div>
                                                    :
                                                    list.length === 0
                                                        ?
                                                        <text style={{ marginBottom: 20 }}>Anda Telah Mencapai item terakhir</text>
                                                        :
                                                        list &&
                                                        list.length > 0 &&
                                                        list.map((entry, index) => {
                                                            return (
                                                                <div key={index} className="boxs">
                                                                    {
                                                                        entry.status === "Tidak tersedia"
                                                                            ?
                                                                            <div>
                                                                                {
                                                                                    entry.status === "Tersedia"
                                                                                        ?
                                                                                        <p className="statusViewAvail">{entry.status}</p>
                                                                                        :
                                                                                        <p className="statusViewNot">{entry.status}</p>
                                                                                }
                                                                                <img className="adjuctimgs" src={entry.image} alt="..." />
                                                                                <p className="catView">[ {entry.category_name}]</p>
                                                                                <p className="textViews">{this.maxText(entry.title)}</p>
                                                                            </div>
                                                                            :
                                                                            entry.status === "Tersedia"
                                                                                ?
                                                                                <Link style={{ textDecoration: 'none' }} to={`/book/${entry.id_book}`}>
                                                                                    <div>
                                                                                        {
                                                                                            entry.status === "Tersedia"
                                                                                                ?
                                                                                                <p className="statusViewAvail">{entry.status}</p>
                                                                                                :
                                                                                                <p className="statusViewNot">{entry.status}</p>
                                                                                        }
                                                                                        <img className="adjuctimgs" src={entry.image} alt="..." />
                                                                                        <p className="catView">[ {entry.category_name}]</p>
                                                                                        <p className="textViews">{this.maxText(entry.title)}</p>
                                                                                    </div>
                                                                                </Link> : ''
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                            }
                                        </div>
                                        <div className="col-md-12 row justify-content-md-center" style={{ marginTop: '-80px', paddingBottom: '100px', alignContent: 'center' }}>
                                            {
                                                list !== undefined
                                                    ?
                                                    <div className="col-md-6 offset-3">
                                                        <Button
                                                            color='none'
                                                            className='btn btn-outline-success '
                                                            onClick={prev}
                                                            disabled={this.state.page < 2}
                                                        >
                                                            Prev
                                     </Button>
                                                        <text style={{ padding: '0 25px' }}>{this.state.page}</text>
                                                        <Button
                                                            color='none'
                                                            className='btn btn-outline-success'
                                                            onClick={next}
                                                            disabled={list.length === 0}
                                                        >
                                                            Next
                                    </Button>

                                                    </div>
                                                    : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="col-md-12">
                                        <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                    </div>
                                    <div style={{ float: 'right', marginTop: '-95px' }}>
                                    </div>
                                    <div className="col-md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                        {
                                            loading
                                                ?
                                                <div className="App-loading">
                                                    <Spinner color="success" />
                                                </div>
                                                :
                                                list.length === 0
                                                    ?
                                                    <text style={{ marginBottom: 20 }}>Anda Telah Mencapai item terakhir</text>
                                                    :
                                                    list &&
                                                    list.length > 0 &&
                                                    list.map((entry, index) => {
                                                        return (
                                                            <div key={index} className="boxs">
                                                                {
                                                                    entry.status === "Tidak tersedia"
                                                                        ?
                                                                        <div>
                                                                            {
                                                                                entry.status === "Tersedia"
                                                                                    ?
                                                                                    <p className="statusViewAvail">{entry.status}</p>
                                                                                    :
                                                                                    <p className="statusViewNot">{entry.status}</p>
                                                                            }
                                                                            <img className="adjuctimgs" src={entry.image} alt="..." />
                                                                            <p className="catView">[ {entry.category_name}]</p>
                                                                            <p className="textViews">{this.maxText(entry.title)}</p>
                                                                        </div>
                                                                        :
                                                                        entry.status === "Tersedia"
                                                                            ?
                                                                            <Link style={{ textDecoration: 'none' }} to={`/book/${entry.id_book}`}>
                                                                                <div>
                                                                                    {
                                                                                        entry.status === "Tersedia"
                                                                                            ?
                                                                                            <p className="statusViewAvail">{entry.status}</p>
                                                                                            :
                                                                                            <p className="statusViewNot">{entry.status}</p>
                                                                                    }
                                                                                    <img className="adjuctimgs" src={entry.image} alt="..." />
                                                                                    <p className="catView">[ {entry.category_name}]</p>
                                                                                    <p className="textViews">{this.maxText(entry.title)}</p>
                                                                                </div>
                                                                            </Link> : ''
                                                                }
                                                            </div>
                                                        )
                                                    })
                                        }
                                    </div>
                                    <div className="col-md-12 row justify-content-md-center" style={{ marginTop: '-80px', paddingBottom: '100px', alignContent: 'center' }}>
                                        {
                                            list !== undefined
                                                ?
                                                <div className="col-md-6 offset-3">
                                                    <Button
                                                        color='none'
                                                        className='btn btn-outline-success '
                                                        onClick={prev}
                                                        disabled={this.state.page < 2}
                                                    >
                                                        Prev
                                            </Button>
                                                    <text style={{ padding: '0 25px' }}>{this.state.page}</text>
                                                    <Button
                                                        color='none'
                                                        className='btn btn-outline-success'
                                                        onClick={next}
                                                        disabled={list.length === 0}
                                                    >
                                                        Next
                                            </Button>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                </div>

                    }

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        book: state.book
    };
};

export default connect(mapStateToProps)(Home);