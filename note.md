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























