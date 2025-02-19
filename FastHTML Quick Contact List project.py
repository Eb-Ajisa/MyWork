from fasthtml.common import *

def render(contact):
    return Li(f"{contact.name} - {contact.email} ",
           A("Delete", hx_delete=f"/{contact.id}", hx_swap="outerHTML", target_id=f'contact-{contact.id}'),
           id=f'contact-{contact.id}'
        ) 


# Initialize FastHTML app with SQLite
app,rt,contacts,Contact = fast_app(
    'contacts.db', 
    live=True, 
    render=render,
    id=int, 
    name=str, 
    email=str, 
    pk="id"
)

def create_contacts():
    if len(contacts()) == 0: 
        contacts.insert(Contact(name="John Doe", email="john.doe@example.com"))
        contacts.insert(Contact(name="Jane Doe", email="jane.doe@example.com"))


def reset_name_input():
    return Input(id="name", placeholder="Name", hx_swap_oob="true")

def reset_email_input():
    return Input(id="email", placeholder="Email", hx_swap_oob="true")
    

# Route to display the contact list
@rt('/')
def get():
    create_contacts()
    # items = [Li(o) for o in contacts()]
    return Titled("Contact Book", Div(
        Ul(*contacts(), id="contacts_list"),
        H2("Add a new contact:"),
        Form(
            reset_name_input(),
            reset_email_input(),
            Button("Add Contact", hx_post="/", target_id="contacts_list", hx_swap="beforeend")
        )
    )
    )

# Route to add a new contact
@rt('/')
def post(contact: Contact): # type: ignore
    contacts.insert(contact)
    return contact, reset_name_input(), reset_email_input()

@rt('/{id}')
def delete(id: int):
    contacts.delete(id)


# Start the server
serve()
