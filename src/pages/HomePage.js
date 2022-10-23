import React from "react";
import ContactList from "../components/ContactList";
import { deleteContact } from "../utils/api";
import { getContacts } from "../utils/api";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }
    return (
        <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
    );
}
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: [],
            keyword: this.props.defaultKeyword || "",
        };
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            console.log(this.state.keyword);
            return { keyword };
        });
        this.props.keywordChange(keyword);
    }
    async onDeleteHandler(id) {
        await deleteContact(id);
        const { data } = await getContacts();
        // update contact
        this.setState(() => {
            return {
                contact: data,
            };
        });
    }
    async componentDidMount() {
        const { data } = await getContacts();
        this.setState(() => {
            return {
                contact: data,
            };
        });
    }
    render() {
        const contacts = this.state.contact.filter((contact) => {
            return contact.name
                .toLowerCase()
                .includes(this.state.keyword.toLowerCase());
        });
        return (
            <section>
                <SearchBar
                    keyword={this.state.keyword}
                    keywordChange={this.onKeywordChangeHandler}
                />
                <h2>Daftar kontak</h2>
                <ContactList
                    contacts={contacts}
                    onDelete={this.onDeleteHandler}
                />
            </section>
        );
    }
}
export default HomePageWrapper;
