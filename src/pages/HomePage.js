import React from "react";
import ContactList from "../components/ContactList";
import { deleteContact, getContacts } from "../utils/data";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: getContacts(),
        };
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
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
        return (
            <section>
                <h2>Daftar kontak</h2>
                <ContactList
                    contacts={this.state.contact}
                    onDelete={this.onDeleteHandler}
                />
            </section>
        );
    }
}
export default HomePage;
