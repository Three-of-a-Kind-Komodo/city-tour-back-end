# BLUSUKAN.COM

Back-End Blusukan.com menggunakan noSQL

## Setting

- `clone` this repository
- use `yarn` to install depedencies
- use `yarn dev` to start this back-end

## List Collection

### User

```
user
id: auto
username: string
email: string
password: string
contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]

ref:
- user has many content
- user has many review
```

### Content

```
id: auto
type: string
title: string
content: string
rating:number
count:number
isActive:boolean
user: { type: Schema.Types.ObjectId, ref: "User" },
reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]

ref:
- content belong to user
- content has many review
```

### Review

```
id: auto
type: string
title: string
review: string
rating: number
isActive:boolean
user: { type: Schema.Types.ObjectId, ref: "User" },
content: { type: Schema.Types.ObjectId, ref: "Content" }

ref:
- review belong to user
- review belong to content
```

## Route

### User

```
getAllUser: .get (URL+ /users/)
getUserById: .get (URL+ /users/:id)
register: .post (URL+ /users/register)
deleteUserById: .delete (URL+ /users/delete/id)
login: .post (URL+ /users/login)
```

### Content

```
getAllContent: .get (URL+ /contents/)
getAllContentByTypeContent: .get (URL+ /contents/:type)
getAllContentByUserId: .get (URL+ /contents/:id)
addContent: .post (URL+ /contents/)
updateContentById: .put (URL+ /contents/:id)
deleteContentById: .delete (URL+ /contents/)
```

### Review

```
getAllReview: .get (URL+ /reviews/)
getAllReviewByContentId: .get (URL+ /reviews/content/:id)
getAllReviewByUserId: .get (URL+ /reviews/user/:id)
addReview: .post (URL+ /reviews/)
updateReviewById: .put (URL+ /reviews/)
```
