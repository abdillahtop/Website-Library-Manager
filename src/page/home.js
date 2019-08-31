import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Button } from 'reactstrap'
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
            books: [],
            searchs: [],
            searching: '',
            page: 1
        }
    }

    componentDidMount = async (page) => {
        await this.props.dispatch(getBook());
        this.setState({
            books: this.props.book,
        });
        await this.props.dispatch(getMoreBook(page))
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
        const { books } = this.state;
        const list = books.bookList

        let next = async () => {
            this.setState({
                page: this.state.page + 1
            })
            const page = this.state.page
            await this.props.dispatch(getMoreBook(page + 1))
            this.setState({
                books: this.props.book
            })
        }

        let prev = async () => {
            this.setState({
                page: this.state.page - 1
            })
            const page = this.state.page
            await this.props.dispatch(getMoreBook(page - 1))
            this.setState({
                books: this.props.book
            })
        }

        return (
            <div>
                <Nav />
                <div className="container" style={{ marginTop: '50px' }}>
                    {
                        dataUser.role === 'admin'
                            ?
                            <div style={{ float: 'right' }}>
                                <Input placeholder="Search Books Here..." style={{ marginTop: '50px' }} className="searchAdmin" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                <div style={{ float: 'right', marginTop: '-40px' }}>
                                    <Modal />
                                </div>
                                <div className="Col md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                    {
                                        list &&
                                        list.length > 0 &&
                                        list.map((entry, index) => {
                                            return (
                                                <div key={index} className="Col md-8 boxs">
                                                    <Link to={`/book/${entry.id_book}`}>
                                                        <div>
                                                            <p className="statusView">{entry.status}</p>
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
                                    <div className="col-md-6 offset-4">
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
                                        >
                                            Next
                                    </Button>

                                    </div>
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
                                        <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                        <div className="Col md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                            {
                                                list &&
                                                list.length > 0 &&
                                                list.map((entry, index) => {
                                                    return (
                                                        <div key={index} className="Col md-8 boxs">
                                                            <Link to={`/book/${entry.id_book}`}>
                                                                <div>
                                                                    <p className="statusView">{entry.status}</p>
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
                                        <div className="col-12 row justify-content-md-center" style={{ marginTop: '-80px', paddingBottom: '100px', alignContent: 'center' }}>
                                            <div className="col-md-6 offset-4">
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
                                                >
                                                    Next
                                    </Button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div style={{ float: 'right' }}>
                                    <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} />
                                    <div style={{ float: 'right', marginTop: '-95px' }}>
                                    </div>
                                    <div className="Col md-12 layoutStyle" style={{ marginTop: '50px' }} >
                                        {
                                            list &&
                                            list.length > 0 &&
                                            list.map((entry, index) => {
                                                return (
                                                    <div key={index} className="Col md-8 boxs">
                                                        <Link to={`/book/${entry.id_book}`}>
                                                            <div>
                                                                <p className="statusView">{entry.status}</p>
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
                                    <div className="col-12 row justify-content-md-center" style={{ marginTop: '-80px', paddingBottom: '100px', alignContent: 'center' }}>
                                        <div className="col-md-6 offset-4">
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
                                            >
                                                Next
                                    </Button>

                                        </div>
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