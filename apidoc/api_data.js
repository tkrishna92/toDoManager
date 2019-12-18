define({ "api": [
  {
    "type": "get",
    "url": "user",
    "title": "get-all-users - for getting all the user details available on the db",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetUser"
  },
  {
    "type": "get",
    "url": "user",
    "title": "get-single-users - for getting single user details available on the db",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetUser"
  },
  {
    "type": "post",
    "url": "user",
    "title": "signup - for new user signup",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostUser"
  },
  {
    "type": "post",
    "url": "user",
    "title": "login - for existing user login",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostUser"
  },
  {
    "type": "post",
    "url": "user",
    "title": "forgotPassword - for recovering of forgotten password",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostUser"
  },
  {
    "type": "put",
    "url": "user",
    "title": "edit-user - for editing the user details available on the db",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PutUser"
  },
  {
    "type": "put",
    "url": "user",
    "title": "delete-user - for deleting user details available on the db",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PutUser"
  },
  {
    "type": "put",
    "url": "user",
    "title": "edit-password - for editing password from the user details available on the db",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PutUser"
  },
  {
    "type": "put",
    "url": "user",
    "title": "logout - for logging out the user and removing the auth details from the db.",
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
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PutUser"
  }
] });
