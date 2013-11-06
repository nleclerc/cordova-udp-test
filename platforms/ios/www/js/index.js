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

function buf2str (arrayBuffer) {
    // UTF-16LE
    return String.fromCharCode.apply(String, new Uint16Array(arrayBuffer));
};
 
function str2buf (string) {
    // UTF-16LE
    var buf = new ArrayBuffer(string.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		app.sendUpdMessage();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    readUdp: function(socketId) {
        chrome.socket.recvFrom(socketId, 1024, function(recvFromInfo){
            message = buf2str(recvFromInfo.data);
            console.log ('Received data: ['+message+'] from '+recvFromInfo.address+':'+recvFromInfo.port);

            if (message.match(/^COTCOT#/))
                console.log('CODEC !!');

            app.readUdp(socketId);
        });
    },

    sendUpdMessage: function() {
        console.group('Sending UDP Message.');

        chrome.socket.create('udp', function (socket) {
            var socketId = socket.socketId;
         
            chrome.socket.bind(socketId, "0.0.0.0", 0, function (result) {
                if (result != 0) {
                    chrome.socket.destroy(socketId);
                    me.handleError("Error on bind(): ", result);
                } else {

                    app.readUdp(socketId);
         
                    chrome.socket.sendTo(socketId, str2buf('COTCOT'), '239.0.0.1', 5000, function(writeInfo){
                        console.log('Sent data:',writeInfo);
                    });
                }
            });
        });

        console.groupEnd();
    }
};
