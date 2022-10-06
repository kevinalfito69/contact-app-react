import React from "react";
import ContactList from "../components/ContactList";
import { deleteContact, getContacts } from "../utils/data";
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
            contact: getContacts(),
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
    onDeleteHandler(id) {
        deleteContact(id);
        // update contact
        this.setState(() => {
            return {
                contact: getContacts(),
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
