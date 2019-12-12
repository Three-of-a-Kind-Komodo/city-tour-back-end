# BLUSUKAN.COM

Back-End Blusukan.com menggunakan noSQL

## Setting

- `clone` this repository
- use `yarn` to install depedencies
- use `yarn dev` to start this back-end

## List Collection

### User

```
id: auto
username: string
email: string
password: string
```

### Content

```
id: auto
type: string
title: string
content: string
```

### Review

```
id: auto
type: string
title: string
coment: string
rating: number
```

## Route

### User

```
getAllUser: get
register: post
deleteUser: delete by id
login: post
```

### Content

```
getAllContent: get
getAllContentByTypeContent: get by type content
getAllContentByUserId: get by user id
addContent: post (user id)
updateContent: put by id
deleteContent: delete by id
```

### Review

```
getAllReview: get
getAllContentByContentId: get by content id
getAllContentByTypeContent: get by type content
getAllContentByUserId: get by user id
addReview: post (user id & content id)
updateReview: put by id
deleteReview: delete by id
```
