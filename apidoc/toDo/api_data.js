define({ "api": [
  {
    "type": "post",
    "url": "List",
    "title": "createNewList - for creating new list",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "createNewItem - for creating new item",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "editItem - for editting existing item in a list",
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
          "content": "{\n      \"errorOccured\": false,\n      \"message\": \"edit success\",\n      \"status\": 200,\n      \"data\": {\n         \"title\": \"item title 5 - edited\",\n          \"description\": \"item description 1 - edited\",\n          \"previousId\": \"previousID\",\n          \"nextId\": \"\",\n         \"owner\": \"ownerId\",\n           \"createdOn\": \"2019-12-05T18:20:01.351Z\",\n         \"dueDate\": \"2019-05-16T18:30:00.000Z\",\n          \"modifiedBy\": \"editRequestSenderId\",\n          \"modifiedOn\": \"2019-12-05T18:25:00.997Z\",\n          \"parent\": \"rsaFnrew\",\n          \"children\": [],\n          \"status\": \"open\",\n          \"isHidden\": false,\n          \"isPrivate\": true,\n          \"privilegedAuthorId\": [],\n          \"listId\": \"--------\",\n          \"itemId\": \"--------\"\n     }\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error- Response:",
          "content": "{\n\"errorOccurred\": true,\n \"message\": \"internal DB error\", \n \"status\": 500,\n \"data\": \"error data\"\n}",
          "type": "json"
        },
        {
          "title": "Error- Response:",
          "content": "{\n      \"errorOccured\": true,\n      \"message\": \"item does not exist\",\n      \"status\": 404,\n      \"data\": null\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "editList - for editing existing list details",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "deleteItem - for deleting item in a list",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "deleteList - for deleting a list",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "getUserAllLists - for getting all the lists with the userId provided as owner",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "getAllListItems - for getting all the items of the lists with the given listId",
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
          "content": "{\n            \"errorOccured\": false,\n            \"message\": \"list items found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"title\": \"item title 1\",\n                    \"description\": \"item description 1\",\n                    \"previousId\": \"\",\n                    \"nextId\": \"\",\n                    \"owner\": \"urDcyozH\",\n                    \"createdOn\": \"2019-12-06T06:44:05.583Z\",\n                    \"dueDate\": \"2019-05-18T18:30:00.000Z\",\n                    \"modifiedBy\": \"\",\n                    \"modifiedOn\": null,\n                    \"parent\": \"\",\n                    \"children\": [],\n                    \"status\": \"open\",\n                    \"isHidden\": false,\n                    \"isPrivate\": true,\n                    \"privilegedAuthorId\": [],\n                    \"listId\": \"gMD9N25e\",\n                    \"itemId\": \"w_5m5ORP\"\n                },\n                {\n                    \"title\": \"item title 2\",\n                    \"description\": \"item description 2\",\n                    \"previousId\": \"\",\n                    \"nextId\": \"\",\n                    \"owner\": \"urDcyozH\",\n                    \"createdOn\": \"2019-12-06T06:44:27.131Z\",\n                    \"dueDate\": \"2019-05-18T18:30:00.000Z\",\n                    \"modifiedBy\": \"\",\n                    \"modifiedOn\": null,\n                    \"parent\": \"\",\n                    \"children\": [],\n                    \"status\": \"open\",\n                    \"isHidden\": false,\n                    \"isPrivate\": true,\n                    \"privilegedAuthorId\": [],\n                    \"listId\": \"gMD9N25e\",\n                    \"itemId\": \"RHuamp-n\"\n                }\n            ]\n        }",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "markItemAsDone - for marking an item as done",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "markItemAsOpen - for marking an item as open",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "markItemAsDone - for marking an list as done",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "markItemAsOpen - for marking an list as open",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "undoAction - for undoing the most recent action",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "redoAction - for redoing the most recent action",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "undoAction - for undoing the most recent action",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  },
  {
    "type": "post",
    "url": "List",
    "title": "redoAction - for redoing the most recent action",
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
    "filename": "app/routes/toDo.js",
    "groupTitle": "list",
    "name": "PostList"
  }
] });