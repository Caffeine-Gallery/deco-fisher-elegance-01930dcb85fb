import Bool "mo:base/Bool";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";

actor {
    // Define the Contact type
    type Contact = {
        name: Text;
        email: Text;
        message: Text;
        timestamp: Time.Time;
    };

    // Create a stable variable to store contacts
    private stable var contacts : [Contact] = [];
    private let contactsBuffer = Buffer.Buffer<Contact>(0);

    // Initialize the buffer with stable contacts
    private func initBuffer() {
        for (contact in contacts.vals()) {
            contactsBuffer.add(contact);
        };
    };

    // Call initBuffer when the canister is created
    initBuffer();

    // System functions for upgrades
    system func preupgrade() {
        contacts := Buffer.toArray(contactsBuffer);
    };

    system func postupgrade() {
        initBuffer();
    };

    // Submit contact form
    public func submitContact(name: Text, email: Text, message: Text) : async Bool {
        try {
            let contact : Contact = {
                name = name;
                email = email;
                message = message;
                timestamp = Time.now();
            };
            contactsBuffer.add(contact);
            return true;
        } catch (e) {
            return false;
        };
    };

    // Get all contacts (admin function)
    public query func getContacts() : async [Contact] {
        Buffer.toArray(contactsBuffer)
    };
}
