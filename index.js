const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);

    case "get":
      const contactById = await contacts.getContactById(id);
      return contactById;

    case "add":
      const createdContact = await contacts.addContact(name, email, phone);
      return createdContact;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      return removedContact;

    default:
      console.warn("\x1B[31mUnknown action type!\x1b[0m");
  }
}

invokeAction(program.opts()).then(console.log).catch(console.error);
