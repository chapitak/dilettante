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

















