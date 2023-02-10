# Movie-inner project_Back-End part

Movie information and community web site.

## 🎥 Demo

[Movie-inner](https://www.movie-inner.click/)

## 📸 Screenshots

![ScreenShot](https://user-images.githubusercontent.com/102861831/217988459-a227a97d-6fd3-4bf3-9018-61f43bacde88.png)
![ScreenShot](https://user-images.githubusercontent.com/102861831/217987931-3ef2a125-d1b2-4749-8f88-f6fa56e65077.png)

## 💻 Project Description

Movie-inner project provides various functions.

1. **Movie Information**
    - Movie information is provided by [TMDB](https://www.themoviedb.org/?language=ko)
    - Upcoming movies, Now playing movies, Popular movies, Movie details, Movie credits
        - Posting about TMDB : [TMDB 에서 영화 정보들 받아오기](https://velog.io/@d159123/Node.js-TMDB-%EC%97%90%EC%84%9C-%EC%98%81%ED%99%94-%EC%A0%95%EB%B3%B4%EB%93%A4-%EB%B0%9B%EC%95%84%EC%98%A4%EA%B8%B0)
    - Movie lists per genre category
2. **Theme**
    - You can receive various themes containing related movies.
        - Posting about Theme : [영화 테마 기능 구현하기](https://velog.io/@d159123/Node.js-%EC%98%81%ED%99%94-%ED%85%8C%EB%A7%88-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EC%A2%8B%EC%95%84%EC%9A%94-%EB%B2%84%ED%8A%BC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
3. **User Account**
    - You can easily sign up with your email or register your account by social login.
        - Emails are sent through [Mailgun](https://www.mailgun.com/)
        - Posting about Email : [Mailgun으로 이메일 전송하기](https://velog.io/@d159123/Mailgun%EC%9C%BC%EB%A1%9C-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A1%ED%95%98%EA%B8%B0-Node.js) , [회원가입 이메일 인증](https://velog.io/@d159123/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%ED%98%84-Node.js)
        - Posting about Social login : [KaKao 로그인 구현하기](https://velog.io/@d159123/Node.js-KaKao-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84REST-API)
        - Posting about Token : [Access Token과 Refresh Token으로 로그인 유지하기](https://velog.io/@d159123/Node.js-Access-Token%EA%B3%BC-Refresh-Token%EC%9C%BC%EB%A1%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0)
        - Posting about S3 and Multer : [S3와 Multer로 프로필 이미지 구현하기](https://velog.io/@d159123/Node.js-S3%EC%99%80-multer%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
    - MyPage provides account details, user's content & comments, and favorite movies.
4. **Community**

    - The community allows users to freely share their opinions through posts, comments, and replies.
        - Posting about Community : [커뮤니티 게시글, 댓글, 대댓글 구현하기](https://velog.io/@d159123/Node.js-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EA%B2%8C%EC%8B%9C%EA%B8%80-%EB%8C%93%EA%B8%80-%EB%8C%80%EB%8C%93%EA%B8%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
    - Users can easily check their notifications about their content.
        - Posting about Notification : [커뮤니티 알람 기능 구현하기](https://velog.io/@d159123/Node.js-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EC%95%8C%EB%9E%8C-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

5. **Search**
    - Users can search movies and credits by keywords.
    - Users can search contents by title, contents, author

More information about Movie-inner : [Movie-inner Velog](https://velog.io/@d159123/series/project-1-movie-inner)

## ⚙️Technologies

Project is created with :

|    Name    |                Description                 |
| :--------: | :----------------------------------------: |
| Typescript |         to add types to Javascript         |
| Express.js |   minimal and flexible Node.js framework   |
|    pnpm    | Fast, disk space efficient package manager |
|   mysql    |  connect the database with an application  |

## 🛠️Installation

```typescript
git init
git clone https://github.com/HoonDongKang/movieinner-project-backend.git
cd movieinner-project-backend
npm install

//you can request to localhost:3714
```

## ✋With

Movie-inner Front-End : [CLOUDoort](https://github.com/CLOUDoort/movieinner-project-frontend)
