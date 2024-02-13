const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getAllContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function createNewContactsList(newContactsList) {
  return fs.writeFile(contactsPath, JSON.stringify(newContactsList));
}

async function listContacts() {
  return await getAllContacts();
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
}

async function addContact(name, email, phone) {
  const contacts = await getAllContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await createNewContactsList(contacts);

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const deletedContact = contacts[idx];

  contacts.splice(idx, 1);

  await createNewContactsList(contacts);

  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
