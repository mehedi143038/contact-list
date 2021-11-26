import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../dbConfig';
import { useParams } from 'react-router';

const EditContact = () => {

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        });
    }

    const { id } = useParams();

    useEffect(()=>{
        async function getContact(){
            const contactForEdit = await db.contacts.toArray();
            for (let i = 0; i < contactForEdit.length; i++){
                if(contactForEdit[i].id.toString() === id.toString()) {
                    setContactInfo({
                        name: contactForEdit[i].name,
                        email: contactForEdit[i].email,
                        phone: contactForEdit[i].phone
                    })
                }
            }
            
        }

        getContact();
    },[id])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(contactInfo);
        db.contacts.update(id, {
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone
        }).then(async() => {
            let allContacts = await db.contacts.toArray();
            setContactInfo(allContacts);
            console.log("update successfull")
        })

        // db.contacts.add(contactInfo).then(async() => {
        //     //retrieve all contacts inside the database
        //     let allContacts = await db.contacts.toArray();
        //     setContactInfo(allContacts);
        // })

        // setContactInfo({
        //     name: '',
        //     email: '',
        //     phone: ''
        // })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Update Contact
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
                                    <button type="submit" className="btn btn-primary">Update Contact</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContact;