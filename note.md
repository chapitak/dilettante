190305

https://scotch.io/tutorials/implementing-authentication-in-nuxtjs-app
이식중. 이 링크가 당분간 나의 준거가 되어주어야 한다. 

0932
너무 잘되고 있다. 이제 vuex에 저장하는 state쪽만 맞추면 됨. 
근데 그 전에 이 모듈이 어떻게 작동하는가? 세션 기반? localstorage기반? 

1414
ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ다죽엇어.. 인증기능 완성했다. 
일단 로컬에서의 로그인을 완성한 셈이다. 
여기서 vuetify를 설치하고, 로그인 기능을 좀 더 폴리싱하자. 마치 로그인만을 위한 웹사이트처럼! 

## 190306

0847
1. sign in 화면으로 이동하는 화면 만들기
-> nuxt link가 못생기게 보이는데, 이건 기본적으로 a 태그를 생성하기 때문이다.  by adding a prop (tag="li") to the <router-link> 라고 했다. 태그 prop을 추가할 수 있다이렇게. 

더 나은 방법이 있을 것 같다. programmable이나.. 

2. 로그인 화면 만들기
- 메일주소와 비밀번호로 로그인하게 해야겠다. 
- 되는데서 복붙했다. 수정하기. 

- menu로 navbar만들기
    - 잘 안만들어진다. v-on directive가 문제라고 말한다. 원인파악이안된다. 

##190311
- 혹시. 로그인 request의 brutal force 해킹시도에 strapi는 어떠헥 대처하는가? 
    - 뭔가 있긴 있는 것 같다. 
- 좋아. 이제 구현이다. 

스키마 추출

파싱해야하는데. 

- id
- album_id
- album_name
- artist_id
- artist_name
- thumbnail
- url

1. released_date
2. genre
3. label
4. agency

- rate
- review(text, md)

- inserted_date
- modified_date
- author
- comment(관계)
- reco(추천)




새로 화면 만들고
정보 가져오는 화면 만들기. 파싱은? 
AddAlbumReview

default 약간 변경. 
텍스트 박스의 크기를 늘리고싶음. 
문제가 뭘까? shrink다. v-flex의 shrink를 일단 빼고, 필요한 데서만 쓰도록 하자. 

ࠀɄ 4:25 2019-03-13
그러기가 또 애매하네.. 
헉 졸리다.. 
그냥 넣고싶은데 잘 안된다. 
한 줄씩 넣을까? 
그냥 그래야겠다. 
일단...
grid가 뜻대로 안된다. 내가 파악하는 것이 우선인 것 같다. 파악하지 않으면 프레임워크는 쓸모가 없다. 우선 내가 알고있는 responsive의 뜻이 있다. 작동하는 사례를 가지고 생각해보자. 

비밀을 푼 것 같다. 일단 v-layout에 row wrap이라는 attr이 있어야 하는 것처럼 보인다. 

190318 작성중에 있다. 
뭔가 항목이 뜨게 했다. 여기서 그만두고 스키마를 설계해야하나? 관련된 추가작업은 집에서나 되는 것 같다. 
(추가작업 -  url 입력-> watched -> html 파싱 및 자동입력. )

1332 
스키마 넣자. album으로. 이거 다되면 freedb에서 작업하자. 불편함을 느끼면 만들어도 될 듯. 
몇 개의 후보. freedb, discorgs, musicbrainz, spotify,  등등... 

헐.. 글고보니 album 객체와 review 객체가 분리되어 있어야 한다. 그 생각을 못했네.. 

album 객체
review는 통일될 수 있나? -> 있다. 
메타데이터를 쭉 땡겨오고 먼저 저장. 그 다음 리뷰 저장. 



 ࠀɄ 1:49 2019-03-18
 [album]
- id
- album_id
- album_name
- artist_id
- artist_name
- thumbnail
- url

1. released_date
2. genre
3. label
4. agency

- created_date

 ----
 딱 여기까지 
 [review]
 album_id
 rate
 review_title
 review_text
 author
 created_date
 
 
 
 
 
 
 
- id
- album_id
- album_name
- artist_id
- artist_name
- thumbnail
- url

1. released_date
2. genre
3. label
4. agency

- rate
- review(text, md)

- inserted_date
- modified_date
- author
- comment(관계)
- reco(추천)

----
ࠀɄ 3:46 2019-03-18
여기서 이제 작성하면, 입력되고, 조회하면, 조회돼야 한다. 
1. 타임라인 만들기. 
2. 개인별 

https://jongmin92.github.io/2017/05/26/Emily/4-crawling/
참고하기. 모듈들이 필요하다. 근데 이거 했었는데 어디서 했더라... 

request하기 만들기. 
post해야하는데 axios로 해야겠지

--
생각. userid에 맞는 review를 불러오고 거기서 id가 albumid와 맞는 데이터들을 쭉 불러와야 하는데 어떻게해야하는지... 쿼리를 짤 수 없으니 영 답답하다. 

적합한 query를 짜야한다. 
아.. 이제 좀 알겠다. strapi의 relation이 있는 이유가 있다. mongodb에는 중복된 데이터가 있어야 한다. 

https://docs.scaphold.io/tutorials/advanced-queries/
여기 join같은걸 하는게 있는거같다. 
그냥.. 무조건 graphql을 쓴다고 보는게 맞는 것 같다. 1:1 관계를 빡세게 짜서. 

ࠀɄ 5:10 2019-03-18
ok 이제 다시 조금 이해했다. 무조건 일대일관계 중심으로 해결해야한다. 일단 이걸 다 짜놓고 다른 장르를 생각하든가.. 하자. 

1. graphql로 create하기. 
- 우선 playground에 쿼리부터 짜보기. 
- 신규album등록 쿼리 
mutation {
  createAlbum(input: {
    data: {
      album_id: "John",
      album_name: "john@doe.com",
      artist_id: "john@doe.com",
      artist_name: "john@doe.com",
      thumbnail: "john@doe.com",
      url: "john@doe.com",
      released_date: "1992/04/16",
      genre: "john@doe.com",
      label: "john@doe.com",
      agency: "john@doe.com",
      created_user: "john@doe.com",
      created_date: "1992/04/16"
    }
  }) {
    album {
      album_id
      album_name
      artist_id
      artist_name
      thumbnail
      url
      released_date
      genre
      label
      agency
      created_user
      created_date
    }
  }
}

오.. 만들었다. 위처럼 하면 된다. 
문제 1. graphql로 할 때는 서버단 처리를 어떻게 하나?
https://strapi.io/documentation/3.x.x/guides/graphql.html#customise-the-graphql-schema 에서 
Apply permissions on a query 부분을 살피자!
 

2. review 남기기
 0319 지금 axios 발송 안돼서 막힌 상태. 
 mutation {
  createReview(input: {
    data: {
      album_id: "test",
      rating: "test",
      review_title: "test",
      review_text: "test",
      created_date: "1992/04/16"
      author: "test"
    }
  }) {
    review {
      album_id
      rating
      review_title
      review_text
      created_date
      author
    }
  }
 이런 식으로 돌리면 된다. 다만 이렇게되면... 
 입력할 때 문제 
 1. User를 로그인된 사람으로 넣어주기. 
 2. 기타 relation 넣어줄 때 문제. 
 

./api/post/config/schema.graphql.
이 파일을 변경해서 graphql의 권한같은거 설정한다. 

그런 것들이 구현에 대한 실제적인 걸림돌이다. 

190320
1700

strapi의 설치, 
[구현할 것.]
1. relation type인 user를 넣어주기(attach author?)
2. policy쪽. 삭제나 수정은 자기만 할 수 있도록 검증하기. 
[그 과정에서 ]
- strapi handler구조에 대한 이해를 얻을 수 있을 것으로 기대. 



2-> policy는 알겠는데요 일단 여기서 handler쪽 보고 어떻게 하는지 한 번 보자. 
내가 어떻게 했더라? 
 기록해둔 바에 따르면 models -> Post.js에서 내가 이렇게 추가하였다. 
    beforeCreate: async (model) => {
    const now_date = new Date();
    model.created_date = now_date;
},

Path — ./api/post/config/schema.graphql.
에 들어가보기. 여기 plicy가 있다. 

./api/*/config/schema.graphql 
이라는 파일이 있다. 이건 만들어줘야 작동한다. 이게 없으면 Shadow CRUD가 작동한다. 

고로, 일단 createReview를 손보려면 Review.create action에 맞춰서 행동해야한다. 그게 되면 graphQL도 될 것이다. 

https://github.com/strapi/strapi/issues/624
상기 링크가 큰 도움이 된다. setOwner를 연구해보자. 

setOwner.js를 만들었다. 

이걸 실행되게 만들어주자.
정책이 안먹는다. 여기서 http request가 패널에는 없다. 

정책을 넣어주니까 안된다. pending된다. 왜? 

0322 1425 노선변경. 
일단 그걸로 해보자 graphql말고 그냥... 

1452 아주 깔끔하게 되었다. 
계정입력은 그럼 된거고 정책으로 해결했고
relation은? 서버에서 할 수 없다. 그냥 클라이언트에서 진행하자. 그럼 다 된거 아닌가? 그.. 권한 문제가 있긴 있다. 하지만 이는 삭제기능을 구현할 때의 일이다. 

1515
세상에.. 다 만들었다. 
이제 조회화면을 만들어야 한다. 
말이 되냐 이게? 
주말에 구현 문제를 하긴 해야 한다. 

생각해보자. 
url을 따면 그걸로 로직을 만들어야 하는데 
url대로 썸네일 다운로드 -> 해당 저장경로대로 호출 이렇게 하면 되겠다 
asset - album이렇게. 
근데 알잖아 그게 생각처럼 쉽게 안된다. 
s3에 저장해야한다. 알지? 
하지만, 그건 나중에 하자. 음 생각보다 금방 할 것 같다!

