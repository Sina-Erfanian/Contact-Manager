import React from 'react'
import { Link } from 'react-router-dom';
import {
  CurrentLine,
  Purple,
  Orange,
  Cyan,
  Red,
} from "../../helpers/colors";
function Contact( {contact , deleteContact}) {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CurrentLine }} className="card my-2">
        <div className="card-body">
          <div className="row d-flex justify-content-around align-items-center">
            <div className="col-md-4 col-sm-4">
              <img
                src="https://via.placeholder.com/200"
                alt="img"
                style={{ border: `1px solid ${Purple}` }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-sm-7 col-md-7">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی :{" "}
                  <span className="fw-bold">{contact.fullname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{" "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  ادرس ایمیل : <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: Orange }}
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: Cyan }}
              >
                <i className="fa fa-pen"></i>
              </Link>
              <button
                onClick={deleteContact}
                className="btn my-1"
                style={{ backgroundColor: Red }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact