# Pixiv Node Server

A customized node server for Pixiv. Based on the API information that grabbed by Fiddler on Pixiv ios mobile app.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

This project is based on Node.js

### Installing & Running

```node
npm install
npm start
```

![install](https://i.imgur.com/r6El4pN.png)

### API

#### POST /login

**_You can login directly by using pixiv account username/password._**

_REQUIRE OAUTH_: FALSE

Request:

```http
POST /login HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: fe6f75c3-4bc0-40e4-a16a-61b1646753dc

{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD"
}
```

Sample Response:

```json
{
  "status": "success",
  "response": {
    "access_token": "access_token_access_token_access_token_",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "",
    "refresh_token": "refresh_token_refresh_token_refresh_token_",
    "user": {
      "profile_image_urls": {
        "px_16x16": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_16.jpg",
        "px_50x50": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_50.jpg",
        "px_170x170": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_170.jpg"
      },
      "id": "9158367",
      "name": "sjy0w0",
      "account": "sjy0w0",
      "mail_address": "sjy0w0@gmail.com",
      "is_premium": false,
      "x_restrict": 2,
      "is_mail_authorized": true
    },
    "device_token": "device_token_device_token_device_token_"
  }
}
```

#### GET /image/*

**_Pixiv will not allow you to access their image directly, so I created this API._**

Sample Link:

```url
http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_170.jpg
```

#### POST /login_refresh

**_This API will use refresh token to get new access token_**

_REQUIRE OAUTH_: FALSE

Request:

```http
POST /login_refresh HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 95d5ffe7-c498-4352-918c-9c2e08c8bcd2

{
  "refresh_token": "refresh_token_refresh_token_refresh_token_"
}
```

Sample Response:

```json
{
  "status": "success",
  "response": {
    "access_token": "access_token_access_token_access_token_",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": "",
    "refresh_token": "refresh_token_refresh_token_refresh_token_",
    "user": {
      "profile_image_urls": {
        "px_16x16": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_16.jpg",
        "px_50x50": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_50.jpg",
        "px_170x170": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_170.jpg"
      },
      "id": "9158367",
      "name": "sjy0w0",
      "account": "sjy0w0",
      "mail_address": "sjy0w0@gmail.com",
      "is_premium": false,
      "x_restrict": 2,
      "is_mail_authorized": true
    }
  }
}
```

#### GET /user/detail?user_id=9158367

**_This api is for user profile_**

_REQUIRE OAUTH_: TRUE

Request:

```http
GET /user/detail?user_id=9158367 HTTP/1.1
Host: localhost:8080
Authorization: Bearer osON7h-QhpqeOLuyungp9rV8OrUdN5VoSTy3e5xWXc8
Cache-Control: no-cache
Postman-Token: e3427618-0f42-4270-a05d-f6ccc77404f0

```

Sample Response:

```json
{
  "status": "success",
  "response": {
    "user": {
      "id": 9158367,
      "name": "sjy0w0",
      "account": "sjy0w0",
      "profile_image_urls": {
        "medium": "http://localhost:8080/image/user-profile/img/2014/10/17/16/23/33/8520338_4ab81e6cd4b323ab7d86c6fc37a63642_170.jpg"
      },
      "comment": "",
      "is_followed": false
    },
    "profile": {
      "webpage": null,
      "gender": "male",
      "birth": "1993-11-25",
      "birth_day": "11-25",
      "birth_year": 1993,
      "region": "カナダ",
      "address_id": 48,
      "country_code": "CA",
      "job": "IT関係",
      "job_id": 1,
      "total_follow_users": 340,
      "total_follower": 1,
      "total_mypixiv_users": 0,
      "total_illusts": 0,
      "total_manga": 0,
      "total_novels": 0,
      "total_illust_bookmarks_public": 2368,
      "total_illust_series": 0,
      "background_image_url": null,
      "twitter_account": "",
      "twitter_url": null,
      "pawoo_url": "https://pawoo.net/oauth_authentications/9158367?provider=pixiv",
      "is_premium": false,
      "is_using_custom_profile_image": true
    },
    "profile_publicity": {
      "gender": "public",
      "region": "public",
      "birth_day": "public",
      "birth_year": "public",
      "job": "public",
      "pawoo": true
    },
    "workspace": {
      "pc": "",
      "monitor": "",
      "tool": "",
      "scanner": "",
      "tablet": "",
      "mouse": "",
      "printer": "",
      "desktop": "",
      "music": "",
      "desk": "",
      "chair": "",
      "comment": "",
      "workspace_image_url": null
    }
  }
}
```

#### Other APIs

**_All other Pixiv APIs which started with /v1/ or /v2/ can be accessed directly, the only thing you need to do is change the hostname_**

Sample Links:

```url
Recommended: /v1/illust/recommended?include_ranking_illusts=true

Trending tags: /v1/trending-tags/illust

Search: /v1/search/illust?search_target=partial_match_for_tags&sort=date_desc&word=初音ミク
```

## Authors

* **Jiyu Shao**
