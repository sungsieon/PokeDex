
![pokedex](https://github.com/user-attachments/assets/8b4b7aba-9c50-412a-90d8-56afb1503aad)

### 기능

- 이름으로 포켓몬 검색 기능
- 포켓몬 이름 한/영 버튼
- 어두운 모드 기능
- 포켓몬에 대한 자세한 정보 창

### **개발 기간**

2024.11.24 ~ 2024.11.30

## **Troubleshooting**

---

웹페이지에 접속 시 150마리의 포켓몬 데이터를 불러오다 보니 렌더링 속도가 너무 느려지는 문제가 있었습니다.  이 문제를 해결하기 위해 Promise.all() 을 사용하여 **비동기 요청을 병렬 처리함으로써** 데이터를 더욱 빠르게 불러오도록 개선했습니다.

이를 통해 대기 시간이 줄어들어 **렌더링 속도가 크게 향상**되었습니다.

그리고 아직 불러오지 않은 포켓몬은 검색 결과에 나타나지 않는 문제가 있었는데,
**전체 포켓몬 데이터를 한 번에 변수에 저장**하여 **검색은 전체 데이터를 대상으로 수행**하도록 변경해서

이 문제를 해결했습니다.
<br /> <br /> <br />


# 다크 모드
![어두운모드 PNG](https://github.com/user-attachments/assets/2f922d3d-c57e-45da-b716-3517eeaa5151)

# 포켓몬 이름 한/영 기능
![한영 PNG](https://github.com/user-attachments/assets/8fe8cda6-22e9-4a1f-80c5-468438935f89)

# 포켓몬 정보 창
![포켓몬정보 PNG](https://github.com/user-attachments/assets/c40c6595-57a4-4b76-889e-6a3b16d3633f)


✔ feat → 새로운 기능 추가<br>
✔ fix → 버그 수정<br>
✔ docs → 문서 수정 (README 등)<br>
✔ style → CSS 등 UI 변경 (기능 X)<br>
✔ refactor → 코드 리팩토링 (기능 변화 X)<br>
✔ test → 테스트 코드 추가/수정<br>
✔ chore → 패키지, 설정 변경
