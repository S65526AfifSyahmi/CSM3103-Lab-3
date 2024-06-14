/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById("addContact").addEventListener("click", addContact);
    document.getElementById("findContact").addEventListener("click", findContact);
    document.getElementById("deleteContact").addEventListener("click", deleteContact);

    function addContact() {
        // Get references to input elements
        var nameInput = document.getElementById("name");
        var phoneNumberInput = document.getElementById("phone_number");
      
        // Check for null values before using them
        if (!nameInput.value || !phoneNumberInput.value) {
            alert("Please enter both name and phone number!");
            return; // Exit the function if either value is null
        }
      
        // Create the contact object (assuming values are valid)
        var myContact = navigator.contacts.create({
            displayName: nameInput.value
        });
      
        // Add phone number
        myContact.phoneNumbers = [
            new ContactField('mobile', phoneNumberInput.value)
        ];
      
        // Save the contact
        myContact.save(addSuccess, addFailed);

        // Prevent default form submission using window.event
        if (window.event) {
            window.event.preventDefault();
        }
    }

    function addSuccess() {
        alert("Contact successfully added!");
    }

    function addFailed(message) {
        alert("Add contact failed, reasons " + message);
    }

    function findContact() {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        fields = ['displayName'];
        navigator.contacts.find(fields, findSuccess, findFailed, options);
    }

    function findSuccess(contacts) {
        var maxIterations = Math.min(contacts.length, 5); // Limit to 5 or less
      
        // Loop through found contacts
        for (var i = 0; i < maxIterations; i++) {
            var displayName = contacts[i].displayName;
            var phoneNumber = "";
        
            // Access and format phone number (assuming phoneNumbers is an array)
            if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
                phoneNumber = contacts[i].phoneNumbers[0].value; // Get first phone number
                // You can optionally format the phone number here
            }
        
            // Display contact information
            alert("Display Name: " + displayName + "\nPhone Number: " + phoneNumber);
        }
    }

    function findFailed(message) {
        alert("Find contact failed, reasons" + message);
    }

    function deleteContact() {
        // Get the filter value (name) from the input element
        var nameFilter = document.getElementById("name").value;
      
        // Check if the filter value is empty
        if (!nameFilter) {
            alert("Please enter a name to filter contacts for deletion.");
            return; // Exit the function if filter value is null
        }
      
        var options = new ContactFindOptions();
        options.filter = nameFilter;
        options.multiple = true;
        fields = ['displayName'];
      
        // Find contacts based on the filter
        navigator.contacts.find(fields, findDeleteSuccess, findFailed, options);
    }
      
    function findDeleteSuccess(contacts) {
        // Check if any contacts were found
        if (contacts.length === 0) {
            alert("No contacts found with the provided name.");
            return; // Exit the function if no contacts found
        }
      
        // Assuming at least one contact is found
        var phoneNumber = contacts[0].phoneNumbers[0].value; // Get first phone number
        var confirmationMessage = "Delete contact: " + contacts[0].displayName + " (" + phoneNumber + ")?";
      
        if (confirm(confirmationMessage)) {
            contacts[0].remove(contactRemoveSuccess, contactRemoveFailed);
        }
    }

    function contactRemoveSuccess() {
        alert("Contact Deleted!");
    }
    
    function contactRemoveFailed(message) {
        alert("Remove failed: reason " + message);
    }
}
