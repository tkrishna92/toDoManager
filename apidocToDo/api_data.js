define({ "api": [
  {
    "type": "get",
    "url": "/friends/checkRequest",
    "title": "check friend requests",
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
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Success-Response:",
            "description": "<p>{ &quot;errorOccured&quot;: false, &quot;message&quot;: &quot;pending requests found&quot;, &quot;status&quot;: 200, &quot;data&quot;: [ { &quot;friendName&quot;: &quot;Hari Haran&quot;, &quot;isFriend&quot;: false, &quot;_id&quot;: &quot;5deb4be3d9defb42ecb2eb47&quot;, &quot;userId&quot;: &quot;oLQ5Dbn3&quot;, &quot;friendId&quot;: &quot;aAg78NDM&quot;, &quot;friendRoom&quot;: &quot;Iyn40QV8Y&quot;, &quot;__v&quot;: 0 } ] }</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "json",
            "optional": false,
            "field": "Error-",
            "description": "<p>Response: { &quot;errorOccurred&quot;: true, &quot;message&quot;: &quot;error retreiving pending request&quot;, &quot;status&quot;: 500, &quot;data&quot;: &quot;error data&quot; }</p>"
          }
        ]
      }
    },
    "filename": "docs/routes/friend.js",
    "groupTitle": "friend",
    "name": "GetFriendsCheckrequest"
  },
  {
    "type": "post",
    "url": "/friends/acceptFriend",
    "title": "accept friend request",
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
    "filename": "docs/routes/friend.js",
    "groupTitle": "friend",
    "name": "PostFriendsAcceptfriend"
  },
  {
    "type": "post",
    "url": "/friends/friendCheck",
    "title": "check selected user friend status",
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
    "filename": "docs/routes/friend.js",
    "groupTitle": "friend",
    "name": "PostFriendsFriendcheck"
  },
  {
    "type": "post",
    "url": "/friends/sendFriendRequest",
    "title": "send friend request",
    "version": "1.0.0",
    "group": "friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the friend-request receiver to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user sending the request to be sent as header/body/query/path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"request sent successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"friendName\": \"Hari Haran\",\n                \"isFriend\": false,\n                \"userId\": \"oLQ5Dbn3\",\n                \"friendId\": \"aAg78NDM\",\n                \"friendRoom\": \"Iyn40QV8Y\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error checking if the friend request exists\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"friend request already sent and is pending acceptance\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/friend.js",
    "groupTitle": "friend",
    "name": "PostFriendsSendfriendrequest"
  },
  {
    "type": "post",
    "url": "/toDo/createNewList",
    "title": "create new list",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body/path/query/header parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listTitle",
            "description": "<p>name of the list to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listDescription",
            "description": "<p>a description of the list to be passed as a body parameter - optional</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"success creating new list\",\n            \"status\": 200,\n            \"data\": {\n                \"listOwner\": \"--------\",\n                \"listDescription\": \"\",\n                \"listCreatedOn\": \"DATE\",\n                \"listStatus\": \"open\",\n                \"listTitle\": \"title\",\n                \"listId\": \"LISTID\",\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"given title already exists is still open - please add item to the list\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoCreatenewlist"
  },
  {
    "type": "post",
    "url": "/toDo/deleteList",
    "title": "delete list",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actionOnList",
            "description": "<p>actionOnList parameter set to &quot;true&quot; to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the item to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"list deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"list not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoDeletelist"
  },
  {
    "type": "post",
    "url": "/toDo/editList",
    "title": "edit list details",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actionOnList",
            "description": "<p>actionOnList parameter set to &quot;true&quot; to be passed as a body parameter- optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listDescription",
            "description": "<p>description of the item for editting to be passed as a body parameter - optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listTitle",
            "description": "<p>title of the item for editting to be passed as a body parameter - optional</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"list update success\",\n            \"status\": 200,\n            \"data\": {\n                \"listOwner\": \"oLQ5Dbn3\",\n                \"listDescription\": \"item description 1 - edited 3\",\n                \"listCreatedOn\": null,\n                \"listStatus\": \"open\",\n                \"listPreviousId\": \"oMOV61Gr\",\n                \"listNextId\": \"\",\n                \"listModifiedBy\": \"aAg78NDM\",\n                \"listModifiedOn\": \"2019-12-08T14:05:33.897Z\",\n                \"listIsHidden\": \"false\",\n                \"listTitle\": \"title 1 - edited 3\",\n                \"listId\": \"OfrwXCh7\",\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no list found for editing\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoEditlist"
  },
  {
    "type": "post",
    "url": "/toDo/getUserAllLists",
    "title": "get all lists of user",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the owner of the list to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"user lists found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"listOwner\": \"urDcyozH\",\n                    \"listDescription\": \"\",\n                    \"listCreatedOn\": \"2019-12-05T20:02:43.449Z\",\n                    \"listStatus\": \"open\",\n                    \"listTitle\": \"title 2\",\n                    \"listId\": \"-riAWN4k\"\n                },\n                {\n                    \"listOwner\": \"urDcyozH\",\n                    \"listDescription\": \"\",\n                    \"listCreatedOn\": \"2019-12-05T20:03:41.174Z\",\n                    \"listStatus\": \"open\",\n                    \"listTitle\": \"title 4\",\n                    \"listId\": \"Hu5TMTk_\"\n                }\n            ]\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error retreiving lists of the user\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"user's list not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoGetuseralllists"
  },
  {
    "type": "post",
    "url": "/toDo/markItemAsDone",
    "title": "mark a list as done",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the list to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"list done\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccurred\": true,\n            \"message\": \"internal DB error\", \n            \"status\": 500,\n            \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no list of given listId found to mark as done\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoMarkitemasdone"
  },
  {
    "type": "post",
    "url": "/toDo/markItemAsOpen",
    "title": "re-open a list",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the list to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"list open\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccurred\": true,\n            \"message\": \"internal DB error\", \n            \"status\": 500,\n            \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no list of given listId found to mark as open\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoMarkitemasopen"
  },
  {
    "type": "post",
    "url": "/toDo/redoListAction",
    "title": "redo list action",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"redo list action successful\",\n            \"status\": 200\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error updating current version\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"list version to revert to not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoRedolistaction"
  },
  {
    "type": "post",
    "url": "/toDo/undiListAction",
    "title": "undo list action",
    "version": "1.0.0",
    "group": "list",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"undo list action successful\",\n            \"status\": 200\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error updating current version\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"list version to revert to not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostTodoUndilistaction"
  },
  {
    "type": "post",
    "url": "/toDo/createNewItem",
    "title": "create new list item",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>id of the list the item is included in has to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>name of the item to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>a description of the list to be passed as a body parameter - optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dueDate",
            "description": "<p>dueDate of the item passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>itemId of the parent to which the item has been added as a child to be passed as body parameter - needed only when adding as a sub-toDo-item</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"success creating new item\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"item title 1\",\n                \"description\": \"item description 1\",\n                \"previousId\": \"\",\n                \"nextId\": \"\",\n                \"owner\": \"------------\",\n                \"createdOn\": \"2019-12-05T14:06:00.395Z\",\n                \"dueDate\": \"2019-05-18T18:30:00.000Z\",\n                \"modifiedBy\": \"\",\n                \"modifiedOn\": null,\n                \"parent\": \"\",\n                \"children\": [],\n                \"status\": \"open\",\n                \"isHidden\": false,\n                \"isPrivate\": true,\n                \"privilegedAuthorId\": [],\n                \"listId\": \"--------\",\n                \"itemId\": \"--------\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"a list item with the given name exists on the given list\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoCreatenewitem"
  },
  {
    "type": "post",
    "url": "/toDo/deleteItem",
    "title": "delete list item",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"item deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"item not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoDeleteitem"
  },
  {
    "type": "post",
    "url": "/toDo/editItem",
    "title": "edit list-item",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the item for editting to be passed as a body parameter - optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of the item for editting to be passed as a body parameter - optional</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dueDate",
            "description": "<p>dueDate of the iter for editting to be passed as a body parameter - optional</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"edit success\",\n            \"status\": 200,\n            \"data\": {\n                \"title\": \"item title 5 - edited\",\n                \"description\": \"item description 1 - edited\",\n                \"previousId\": \"previousID\",\n                \"nextId\": \"\",\n                \"owner\": \"ownerId\",\n                \"createdOn\": \"2019-12-05T18:20:01.351Z\",\n                \"dueDate\": \"2019-05-16T18:30:00.000Z\",\n                \"modifiedBy\": \"editRequestSenderId\",\n                \"modifiedOn\": \"2019-12-05T18:25:00.997Z\",\n                \"parent\": \"rsaFnrew\",\n                \"children\": [],\n                \"status\": \"open\",\n                \"isHidden\": false,\n                \"isPrivate\": true,\n                \"privilegedAuthorId\": [],\n                \"listId\": \"--------\",\n                \"itemId\": \"--------\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"internal DB error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"item does not exist\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoEdititem"
  },
  {
    "type": "post",
    "url": "/toDo/getAllListItems",
    "title": "get all items of a list",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the items that they belong to must be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n    \"errorOccured\": false,\n    \"message\": \"list items found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"title\": \"item title 1\",\n            \"description\": \"item description 1\",\n            \"previousId\": \"\",\n            \"nextId\": \"\",\n            \"owner\": \"urDcyozH\",\n            \"createdOn\": \"2019-12-06T06:44:05.583Z\",\n            \"dueDate\": \"2019-05-18T18:30:00.000Z\",\n            \"modifiedBy\": \"\",\n            \"modifiedOn\": null,\n            \"parent\": \"\",\n            \"children\": [],\n            \"status\": \"open\",\n            \"isHidden\": false,\n            \"isPrivate\": true,\n            \"privilegedAuthorId\": [],\n            \"listId\": \"gMD9N25e\",\n            \"itemId\": \"w_5m5ORP\"\n        },\n        {\n            \"title\": \"item title 2\",\n            \"description\": \"item description 2\",\n            \"previousId\": \"\",\n            \"nextId\": \"\",\n            \"owner\": \"urDcyozH\",\n            \"createdOn\": \"2019-12-06T06:44:27.131Z\",\n            \"dueDate\": \"2019-05-18T18:30:00.000Z\",\n            \"modifiedBy\": \"\",\n            \"modifiedOn\": null,\n            \"parent\": \"\",\n            \"children\": [],\n            \"status\": \"open\",\n            \"isHidden\": false,\n            \"isPrivate\": true,\n            \"privilegedAuthorId\": [],\n            \"listId\": \"gMD9N25e\",\n            \"itemId\": \"RHuamp-n\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error retreiving items of the user\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"listId for the items required not provided\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"list's items not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoGetalllistitems"
  },
  {
    "type": "post",
    "url": "/toDo/markItemAsDone",
    "title": "mark an item as done",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"item marked as done\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccurred\": true,\n            \"message\": \"internal DB error\", \n            \"status\": 500,\n            \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no item of given itemId found to mark as done\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoMarkitemasdone"
  },
  {
    "type": "post",
    "url": "/toDo/markItemAsOpen",
    "title": "re-open an item",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"item marked as open\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccurred\": true,\n            \"message\": \"internal DB error\", \n            \"status\": 500,\n            \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"no item of given itemId found to mark as open\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoMarkitemasopen"
  },
  {
    "type": "post",
    "url": "/toDo/redoAction",
    "title": "redo list action",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"redo successfull\",\n            \"status\": 200\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error updating current version\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"current item not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoRedoaction"
  },
  {
    "type": "post",
    "url": "/toDo/undoAction",
    "title": "undo item action",
    "version": "1.0.0",
    "group": "list_item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user creating the item to be passed as body/path/query/header param</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listOwnerId",
            "description": "<p>user Id of the owner of the list to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item to be passed as path parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"undo successfull\",\n            \"status\": 200\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error updating current version\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"current item not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/toDo.js",
    "groupTitle": "list_item",
    "name": "PostTodoUndoaction"
  },
  {
    "type": "get",
    "url": "/user/getSingleUsers",
    "title": "getsingle user details",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose data is being requested passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"users found\",\n            \"status\": 200,\n            \"data\": {\n                       {\n                        \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                        \"userDetails\": {\n                            \"userId\": \"---------\",\n                            \"firstName\": \"----------\",\n                            \"lastName\": \"--------\",\n                            \"email\": \"----@somedomain.com\",\n                            \"mobileNumber\": 1234567890,\n                            \"countryCode\": \"+91\"\n                        },\n                        \n                    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error getting user details\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "GetUserGetsingleusers"
  },
  {
    "type": "get",
    "url": "/users/getAllUsers",
    "title": "get all toDo users",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user requesting the data to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"users found\",\n            \"status\": 200,\n            \"data\": {\n                       {\n                        \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                        \"userDetails\": {\n                            \"userId\": \"---------\",\n                            \"firstName\": \"----------\",\n                            \"lastName\": \"--------\",\n                            \"email\": \"----@somedomain.com\",\n                            \"mobileNumber\": 1234567890,\n                            \"countryCode\": \"+91\"\n                        },\n                        {\n                        \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                        \"userDetails\": {\n                            \"userId\": \"---------\",\n                            \"firstName\": \"----------\",\n                            \"lastName\": \"--------\",\n                            \"email\": \"----@somedomain.com\",\n                            \"mobileNumber\": 1234567890,\n                            \"countryCode\": \"+91\"\n                        },\n                        {\n                        \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                        \"userDetails\": {\n                            \"userId\": \"---------\",\n                            \"firstName\": \"----------\",\n                            \"lastName\": \"--------\",\n                            \"email\": \"----@somedomain.com\",\n                            \"mobileNumber\": 1234567890,\n                            \"countryCode\": \"+91\"\n                        }\n                    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"invalid user password\",\n            \"status\": 400,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"login error\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "GetUsersGetallusers"
  },
  {
    "type": "post",
    "url": "/users/forgotPassword",
    "title": "password recovery",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email Id to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user that was initially used while signup to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"new token generated for forgot password - use this token for updating password- valid for 2 minutes\",\n            \"status\": 200,\n            \"data\": {\n                \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                \"userDetails\": {\n                    \"userId\": \"---------\",\n                    \"firstName\": \"----------\",\n                    \"lastName\": \"--------\",\n                    \"email\": \"----@somedomain.com\",\n                    \"mobileNumber\": 1234567890,\n                    \"countryCode\": \"+91\"\n                }\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"user mobileNumber incorrect\",\n            \"status\": 400,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error saving new token\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PostUsersForgotpassword"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "login user",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email Id to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password starting with a capital alphabet containing atleast 8 characters to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"login success\",\n            \"status\": 200,\n            \"data\": {\n                \"userToken\": \"aaaaaaaaabbbbbbbbbbcccccccccdddddddddeeeeeeeasdjkfla;sdjfkjl;\",\n                \"userDetails\": {\n                    \"userId\": \"---------\",\n                    \"firstName\": \"----------\",\n                    \"lastName\": \"--------\",\n                    \"email\": \"----@somedomain.com\",\n                    \"mobileNumber\": 1234567890,\n                    \"countryCode\": \"+91\",\n                    \"roomId\": \"----------\"\n                }\n            }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"invalid user password\",\n            \"status\": 400,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"login error\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PostUsersLogin"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "signup",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>user first name to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>user last name to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email Id to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password starting with a capital alphabet containing atleast 8 characters to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>user's mobileNumber to be passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "countryCode",
            "description": "<p>user's country code to be passed as body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"signup success\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"--------\",\n                \"firstName\": \"abccde\",\n                \"lastName\": \"abccse\",\n                \"email\": \"abc@somedomain.com\",\n                \"mobileNumber\": 1234567890,\n                \"countryCode\": \"+91\",\n                \"createdOn\": \"1575445340092\",\n                \"roomId\": \"---------\"\n            }\n        }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"signup error\", \n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n            \"errorOccured\": true,\n            \"message\": \"user with the given email already exists\",\n            \"status\": 400,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PostUsersSignup"
  },
  {
    "type": "put",
    "url": "/users/editPassword",
    "title": "edit user password",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editParameter",
            "description": "<p>editParameter of the user to be passed as body. any parameter other than password accepted</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n           \"errorOccured\": false,\n           \"message\": \" user password updated for : 1 details\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"nModified\": 1,\n               \"ok\": 1\n           }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"no user found\",\n            \"status\": 404,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error editing user details\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n           \"errorOccured\": true,\n           \"message\": \"error verifying user's authentication details\",\n           \"status\": 500,\n           \"data\": {\n               \"name\": \"TokenExpiredError\",\n               \"message\": \"jwt expired\",\n               \"expiredAt\": \"2019-12-04T15:34:18.000Z\"\n           }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PutUsersEditpassword"
  },
  {
    "type": "put",
    "url": "/users/logout",
    "title": "logout user",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n           \"errorOccured\": false,\n           \"message\": \" logout successful\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"ok\": 1,\n               \"deletedCount\": 1\n           }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"User's authentication details not found\",\n            \"status\": 404,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error logging out user\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n           \"errorOccured\": true,\n           \"message\": \"error verifying user's authentication details\",\n           \"status\": 500,\n           \"data\": {\n               \"name\": \"TokenExpiredError\",\n               \"message\": \"jwt expired\",\n               \"expiredAt\": \"2019-12-04T15:34:18.000Z\"\n           }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PutUsersLogout"
  },
  {
    "type": "put",
    "url": "/users/:userId/delete",
    "title": "delete a user's todo account",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose data is being requested passed as body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n           \"errorOccured\": false,\n           \"message\": \" user deleted\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"ok\": 1,\n               \"deletedCount\": 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"no user found\",\n            \"status\": 404,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error deleting user\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PutUsersUseridDelete"
  },
  {
    "type": "put",
    "url": "/users/:userId/edit",
    "title": "edit the user details",
    "version": "1.0.0",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose data about to be editted will be passed as query parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user to be passed as body, query or header parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editParameter",
            "description": "<p>properties of the user that have to be editted to be passed as body. any parameter other than password accepted</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n           \"errorOccured\": false,\n           \"message\": \" user details updated for : 0 details\",\n           \"status\": 200,\n           \"data\": {\n               \"n\": 1,\n               \"nModified\": 1,\n               \"ok\": 1\n           }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n     \"errorOccured\": true,\n            \"message\": \"no user found\",\n            \"status\": 404,\n            \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n        \"message\": \"error editing user details\",\n        \"status\": 500,\n        \"data\": \"error data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/routes/user.js",
    "groupTitle": "users",
    "name": "PutUsersUseridEdit"
  }
] });
