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
        var myContact = navigator.contacts.create(
            {
                "displayName" : "Ahmad Faisal"
            }
        );
        myContact.save(addSuccess, addFailed);
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
        for (var i = 0; i < contacts.length; i++) {
            alert("Display Name = " + contacts[i].displayName);
        }
    }

    function findFailed(message) {
        alert("Find contact failed, reasons" + message);
    }

    function deleteContact() {
        var options = new ContactFindOptions();
        options.filter = "Ahmad Faisal";
        options.multiple = true;
        fields = ['displayName'];
        navigator.contacts.find(fields, findDeleteSuccess, findFailed, options);
    }

    function findDeleteSuccess(contacts) {
        var contact = contacts[0];
        contact.remove(contactRemoveSuccess, contactRemoveFailed);
    }

    function contactRemoveSuccess() {
        alert("Contact Deleted!");
    }
    
    function contactRemoveFailed(message) {
        alert("Remove failed: reason " + message);
    }
}
