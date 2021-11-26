import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import db from '../dbConfig';
import { saveContact } from '../features/contactSlice';


const AddContact = () => {

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(saveContact({
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone
        }))

        db.contacts.add(contactInfo).then(async() => {
            //retrieve all contacts inside the database
            let allContacts = await db.contacts.toArray();
            setContactInfo(allContacts);
        })

        setContactInfo({
            name: '',
            email: '',
            phone: ''
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add New Contact
                                <Link to="/" className="btn btn-primary btn-sm float-end">BACK</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input required type="text" name="name" value={contactInfo.name} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input required type="text" name="email" value={contactInfo.email} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Phone</label>
                                    <input required type="text" name="phone" value={contactInfo.phone} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Save Contact</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;