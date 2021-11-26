import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import db from '../dbConfig';
//import { selectContactList } from '../features/contactSlice';

const Contacts = () => {
    //const contactList = useSelector(selectContactList);
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const getContacts = async() => {
            let allContacts = await db.contacts.toArray();
            setContacts(allContacts);
        }
        getContacts();
    }, [])

    const handleDelete = async(id) =>{
        db.contacts.delete(id);
        let allContacts = await db.contacts.toArray();
        setContacts(allContacts); 
    }

    var table_HTML_Input = "";
    table_HTML_Input = contacts.filter((val)=>{
        if(searchTerm === ""){
            return val;
        }else if(
            val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            val.phone.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        ){
            return val;
        }
    }).map((item)=>{
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><Link to={`/edit-contact/${item.id}`} className="btn btn-primary btn-sm">Edit</Link></td>
                <td><button type="button" className="btn btn-danger" onClick={ ()=> handleDelete(item.id) }>Delete</button></td>
            </tr>
        )
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>All Contacts
                                <Link to="/add-contact" className="btn btn-primary btn-sm float-end">Add New Contact</Link>
                            </h4>
                            <input 
                                type="text" 
                                placeholder="Search Contact..." 
                                className="form-control w-50"
                                onChange = {(e)=>{
                                    setSearchTerm(e.target.value);
                                }} 
                                />
                        </div>
                        <div className="card-body">
                            <table className="table table-responsive table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>NAME</td>
                                        <td>EMAIL</td>
                                        <td>PHONE</td>
                                        <td>EDIT</td>
                                        <td>DELETE</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table_HTML_Input}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;