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


ࠀɄ 1:03 2019-03-28
문제가 있다면. 
Cannot read property 'replace' of undefined
집에서 돌려보니까. 
var artist_name = $('.artist').text().replace(/\t/gi,"").replace(/\n/gi,"")
여기였던것같은데.
일단 다시 링크 수정 후 해보자. 

1. 있는지 확인하는 로직. 
- graphql로 먼저 짜보기. 
not null을 돌리면, 
- 생각을 하자. 일단 client에서 id 구하기.
ࠀɄ 5:08 2019-03-28
이건 내 생각인데, async라서 안되는듯. 콜백넣어서 잘해보자. 


  ------
  
  ࠀ| 10:30 2019-03-29
  헉, 완벽구현해버림. 
  할 일. 
  현재 저장, 등록, 업데이트 된다. 삭제만 안되는 셈이다. 
  
  1. 이미지 저장.
  1.1 s3의 특정 버켓에 저장되게 하기
  1.2 view 화면에서 불러오기. 
  
  2. grid-type view화면 만들기(view-all-album-reviews)
  2-1. pc화면. 
  - grid로. vuetify의 datatable로 될까? 
  TOAST UI Grid도 후보. 하지만 역시 vuetify로 하자. 
  일단 화면에 쭉 크게 띄우는걸로 하자 시원시원하게. 
  - 걍 한번에 다 불러오자. 
  - 1000장 정도는 불러오지 않나. 아 근데... 어떻게불러오지.. 
  아.. album-review 다대일 관계를 확실히 해두어야 한다.
review 입력할 때 입력되게 하자.   
  관계맺기할때 어떻게 하더라? id를 쏴주나? 
  
  신규건 아니건 id를 가져와야한다. 
  어떻게든 콜백을 써야겠는데. 
  
  ࠀɄ 5:04 2019-03-29
  graphql 짜야한다. 
  query 
  
  ------------
  3. scroll type view화면 만들기.
  
  이거 어떻게하는지 알겠다. 
  역으로 가져오면 된다. review만 가져오면 끝날 일이다. 
  
  ࠀɄ 4:13 2019-04-01
  원래 어땠나 보자. json을 array로 받으려고 할 때 발생하는 흔한 현상인 듯. 
  
  맨 앞줄에 놓이는 순번은? 
  
  일단 완성됐다. cell width size가 맘에 안들긴 하는데 어쩔 수 없다고 생각. 
  
  이제 이대로 두면 잘 쌓일 것이다. 
  중량테스트 필요. 먼저 created-date 넣기. 
  어디 참조? post것 참조. 
  ࠀɄ 5:32 2019-04-01
  부하 테스트 해보기. 아이디 한 개로 사용할 것. 
  view 화면 만들기. 
  component 모바일 친화적으로 만들자. 
  이미지 해야된다 ㅠ 
  s3에 밀어넣기. 외부함수로 해도 되겠다 다운만 되면 되니까. 물론 공격받을 수도 있다고 생각함. 그럼 어떡하나.. 내부에서 호출하면 좋을 것 같은데. 
  
  정했다. cloud function을 만들고 거기서 s3로 다운로드 하도록 쓰기. 
  그거 먼저 하고 생각하자. 아마 strapi 내부에서 호출 될 것. xhr 방식으로. 
  
  s3에서 설정해야겠다... 
  
  
 
  var thumbnail_url = result.thumbnail
  var album_id = result.album_id
  var theUrl = 'https://us-central1-orbital-builder-208407.cloudfunctions.net/getAlbumThumb?thumbnail_url=' + thumbnail_url + '&album_id=' + album_id

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);


    https://us-central1-orbital-builder-208407.cloudfunctions.net/getAlbumThumb?thumbnail_url=https://cdnimg.melon.co.kr/cm/album/images/000/04/275/4275_500.jpg?1566930fa95cf4691aaf20d3becf58df/melon/resize/282/quality/80/optimize&album_id=4275

    이게 url이었다. 

    model.created_date = now_date;
    result.album_id
    result.thumbnail

    
  
  할 일: cloud function python 만들기. 저장-로드. aws cli를 통해서. 
  로드해오기까지. 
  
  
  aws s3api create-bucket --bucket dilettante --region ap-northeast-2 --create-bucket-configuration LocationConstraint=ap-northeast-2
  
  https://stackoverflow.com/questions/15050057/download-a-file-directly-to-s3
  이거 참조하면 될듯. 
이제 해야할 것은? thumb  url을 보내면 그걸 받아서 저장하게 만들어야 한다. 
  
  https://us-central1-orbital-builder-208407.cloudfunctions.net/getAlbumThumb?thumbnail_url=https://cdnimg.melon.co.kr/cm/album/images/000/04/275/4275_500.jpg?1566930fa95cf4691aaf20d3becf58df/melon/resize/282/quality/80/optimize&album_id=4275
  
  으 토할거같아
  완성했다 ㅠ 
  너무 행복하다.. 
  내가만든 코드가 다시 cloud function에서 돌아가고 있다 
  물론 DB는 아니지만ㅋㅋㅋㅋ
  
  
  ࠀɄ 2:33 2019-04-02
  beforecreate에 넣을까? 그래도 되고... 보안상 위험하니까 그렇게 하자. 
  parameter 2개 가져오기. 
  1. 

  190402
  afterCraete에 넣었다. 잘 저장된다. 불러오는 경로는 

  http://s3.ap-northeast-2.amazonaws.com/dilettante/42751.jpg
  맨 뒤에 albumid를 넣으면 그 사진이 있다면! 불러와진다. 
  하.. 이것도 참 오래걸렸다. 

  컴포넌트로 만들어서 재사용해야될 것 같다. 

  1. 카드 컴포넌트

  2. 스레드 컴포넌트

  3. 페이지는 ㄱ. 앨범에 붙는 스레드 ㄴ. 유저에 붙는 스레드. 
어. 인스타그램처럼 길쭉한 카드로 만들자. 인스타그램은 정사각형이지? 
--------------------------------------------------------------------------------
대충 위의 점선 정도의 길이. 몇 픽셀일까? 

와 vuetify의 parallax써도 예쁘겠다.. 그런데 마땅한 방법은 떠오르지 않음. 
그냥 이걸 쓸까? 쓰자. 여기선 이걸로 쓰고, 다른 페이지에서 전체 화면을 띄우게 하자. 


  ࠀ| 8:03 2019-04-03
material icon 모음
audiotrack (음표) 영문표현은? like, love, sugar honey hype! 
music_note(음표)
comment

  보려면 
  
  배포는 netlify로 하기. 
  strapi는 ssl 어케하지 
  
  1. 일단 정보 불러오기. review 5개만 불러오자. 
  
 불러올 정보가 없을 때 <slot>이라는걸 사용하면 된다고 한다. prop관련 https://kr.vuejs.org/v2/guide/components.html#Props%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0 여기 관련 정보 있는 듯. 
 
 oh......알겠따. 지금까지 헛짓거리하고 있었다. 
 id만 넘기자. 나머지는 개별 ajax로딩으로 간다.

 190404
 그거. 검색창 만들자. 
 1105검색창로직이해

 1722
 전부검색만 된다. 
 수정해보려니까 안됐다. 
 filter property가 없단다. 
 example을 찾아야한다. 
 https://frontid.github.io/vuetify-data-table-multi-filter/
 찾았다. 이대로 하자 이거가 대박인듯
 생각을 천천히 하는게 남는거당... 
 https://github.com/frontid/vuetify-data-table-multi-filter