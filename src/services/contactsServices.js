import axios from "axios";

const SERVER_URL = "http://localhost:9000";

//GET all contacts
export const getAllContacts = () => {
  const url = `${SERVER_URL}/contacts`;
  return axios.get(url);
};

//GET contact with id
export const getContact = (id) => {
  const url = `${SERVER_URL}/contacts/${id}`;
  return axios.get(url);
};

//GET all groups
export const getAllGroups = () => {
  const url = `${SERVER_URL}/groups`;
  return axios.get(url);
};

//GET group with id
export const getGroup = (id) => {
  const url = `${SERVER_URL}/groups/${id}`;
  return axios.get(url);
};

//POST Contact
export const createContact = (contact) => {
  const url = `${SERVER_URL}/contacts`;
  return axios.post(url, contact);
};

//PUT contacts
export const updateContact = (contact, contactId) => {
  const url = `${SERVER_URL}/contacts/${contactId}`;
  return axios.put(url, contact);
};

//DELETE contacts
export const deleteContact = (id) => {
  const url = `${SERVER_URL}/contacts/${id}`;
  return axios.delete(url);
};
