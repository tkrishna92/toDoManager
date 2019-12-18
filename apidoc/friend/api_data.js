define({ "api": [
  {
    "type": "post",
    "url": "friend",
    "title": "acceptFriend - for accepting a freind request",
    "version": "1.0.0",
    "group": "friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user sending the request to be sent as header/body/query/path parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "friendId",
            "description": "<p>: the id of the user that sent the friend request to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"friend request accepted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"friendName\": \"Hari Haran\",\n                \"isFriend\": true,\n                \"userId\": \"aAg78NDM\",\n                \"friendId\": \"oLQ5Dbn3\",\n                \"friendRoom\": \"jIPcqP1Vb\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error retreiving acceptor's user details\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no such pending request found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "friend",
    "name": "PostFriend"
  },
  {
    "type": "post",
    "url": "friend",
    "title": "checkRequest - for checking pending requests available for the user",
    "version": "1.0.0",
    "group": "friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user sending the request to be sent as header/body/query/path parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "selectedUserId",
            "description": "<p>user id of the selected user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"selected user is a friend of the current user\",\n            \"status\": 200,\n            \"data\": {\n                \"friendName\": \"Hari Haran\",\n                \"isFriend\": true,\n                \"userId\": \"oLQ5Dbn3\",\n                \"friendId\": \"aAg78NDM\",\n                \"friendRoom\": \"Iyn40QV8Y\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error verifying user's friend\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"selected user not a friend\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "friend",
    "name": "PostFriend"
  }
] });
