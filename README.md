# BLUSUKAN.COM

Back-End Blusukan.com menggunakan noSQL

## List Collection

### User

```
id: integer
username: string
email: string
password: string
```

### Content

```
id: integer
type: string
title: string
content: string
```

### Review

```
id: integer
type: string
title: string
coment: string
rating: integer
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
