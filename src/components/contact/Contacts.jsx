import React from "react";
import { Pink, CurrentLine, Orange } from "../../helpers/colors";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { ContactContext } from "../../Context/ContactContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
function Contacts() {
  const { loading, deleteContact, filteredContacts } =
    useContext(ContactContext);
  return (
    <React.Fragment>
      <section className="container mt-2">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link
                  to="/contacts/add"
                  className="btn mx-2"
                  style={{ backgroundColor: Pink }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c, i) => (
                <Contact
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                  key={i}
                  contact={c}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CurrentLine }}
              >
                <p className="h3" style={{ backgroundColor: Orange }}>
                  مخاطب یافت نشد ...
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="img"
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export default Contacts;
