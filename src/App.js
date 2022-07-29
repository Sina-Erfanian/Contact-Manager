import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AddContact, EditContact, ViewContact } from "./components";
import _ from "lodash";
import { ContactContext } from "./Context/ContactContext";
import { useImmer } from "use-immer";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactsServices";
import { confirmAlert } from "react-confirm-alert";
import { CurrentLine, Foreground, Purple, Yellow } from "./helpers/colors";
import {ToastContainer , toast} from "react-toastify"

const App = () => {
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);
      console.log("Data is :", data);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد " , {icon : " 💫"})
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      setLoading((prev) => !prev);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: Purple }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Comment }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      setContacts((draft) => draft.filter((c) => c.id != contactId));
      setFilteredContacts((draft) => draft.filter((c) => c.id != contactId));

      const { status } = await deleteContact(contactId);

      toast.error("مخاطب با موفقیت حذف شد" , {icon : " 😟"})

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts((draft) =>
      draft.filter((c) =>
        c.fullname.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, 1000);

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        contacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
