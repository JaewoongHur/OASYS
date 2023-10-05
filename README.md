# 포팅 매뉴얼
Detail Porting Manual for Team. Dolfin production.(A.K.A Oasys) <br>

## 프로젝트 개요
오프라인 은행에서 마주하는 번호표 기계

One-stop Aid System for Senior People (A.K.A OASYS)는 얼굴 인식 및 음성 인식을 통한 AI 컨시어지 키오스크 서비스입니다. 

실제 현장 답사[디지로그브랜치 신한은행 서소문지점]와 일반인 인터뷰[소공경로당]를 진행하였습니다.

얼굴 인식을 통해 어르신분들이 더 편하게 이용하실 수 있도록 간단한 UI로 변환되며 음성 인식을 통해 고객의 니즈를 파악해 원하는 창구 업무로 연결됩니다.

또한, 음성 출력을 통해 시각적으로 불편한 분들도 편리하게 사용할 수 있습니다.

번호표 용지를 최소화하기 위해 문자 및 전화 서비스를 사용합니다.



## 영상


## 빌드/배포 시나리오

- 전체 프로젝트 구조


- 파일 구조
    - Back
    
        manager-service
        ```
        Back-End (서버에 있는 manager-service)
            ├── Dockerfile
            ├── pom.xml
            ├── sql_script.sql
            └── src
                └── main
        ```

        kiosk-service

        ```
        Back-End_AI (키오스크용 service)
            ├── mvnw
            ├── mvnw.cmd
            ├── output.mp3
            ├── pom.xml
            ├── src
            │   ├── main
            │   └── test
            ├── 업무_응대_확인_남자.mp3
            └── 업무_응대_확인_여자.mp3
        ```

    - Front
        ```
        frontend/oasys
            ├── Dockerfile
            ├── README.md
            ├── dist
            ├── index.html
            ├── nginx.conf
            ├── nginx.conf.bak2
            ├── node_modules
            ├── package-lock.json
            ├── package.json
            ├── public
            ├── src
            ├── tsconfig.json
            ├── tsconfig.node.json
            └── vite.config.ts

        ```


### 협업 정보
---
#### <i>협업 툴</i>

    이슈 관리 : JIRA

    형상 관리 : GITLAB

    커뮤니케이션 : Notion, Mattermost

    디자인 : figma

---

#### <i>협업 환경</i>
- JIRA
    - 매 주 목표량을 설정하여 Sprint 진행
    - 업무 할당량을 정하여 Story Point 설정
- GITLAB
    - Git-flow전략을 통하여 효율적인 브랜치 관리
    - 코드 검토 및 피드백
- NOTION
    - 데일리 스크럼(일일 스탠드업 미팅) 기록
        - 매일 아침마다 현재 진행 상황과 그 날의 목표 공유
        - 어려움이나 문제점을 공유
        - 특이사항 및 변경사항 공유
    - 일일 회고 기록
        - 하루 동안의 완료한 작업 기록
    - 스프린트 세션 기록
        - 매 주 금요일 오후 5시에 일주일 간의 프로젝트 진행 상황 점검 및 피드백
        - 프로젝트 회고를 진행하며 팀의 성과와 개선점을 공유
    - 회의 기록
        - 회의가 있을 때마다 회의록을 기록하여 보관
    - 그라운드 룰 기록
        - 프로젝트 수칙, 생활 수칙, 마인드셋 수칙 기록
    - 컨벤션 기록
        - 코딩 컨벤션, 브랜치 컨벤션, 커밋 컨벤션, 지라 컨벤션 기록
    - 문서 관리
        - 기능 명세서, ERD, 스토리보드 등 모두가 공유해야하는 문서 관리
        
### 사용한 버전관리
---

#### <i>OS</i>
OS : Ubuntu 20.04 LTS

---

#### <i>Servers</i>
Nginx : nginx/1.25.2

JVM : openjdk 11.0.16 2022-07-19 / OpenJDK Runtime Environment 18.9 (build 11.0.16+8) / OpenJDK 64-Bit Server VM 18.9 (build 11.0.16+8, mixed mode, sharing)

Spring boot : 2.7.15

React : 18.2.0

NodeJS : 18.17.1

---

#### <i>Build</i>
Maven : Apache Maven 3.6.4

NPM : 9.8.0

---

#### <i>DB</i>


MariaDB : 11.1.2-MariaDB, client 15.2 for debian-linux-gnu (x86_64) using  EditLine wrapper

Redis : 7.2.1


---

#### <i>extra</i>

Docker : Docker version 24.0.5, build 24.0.5-0ubuntu1~20.04.1

Jenkins : 2.414.1

prometheus : 2.47.0

Grafana : 10.1.4

---

#### <i>IDE</i>

Intellij IDEA 2023.1.3 (Ultimate Edition)

Visual Studio Code 1.82.2

---


### 빌드 시 사용되는 환경 변수

JENKINS_PORT=8088

PROMETHEUS_PORT=9090

GRAFANA_PORT=3000

### 배포시 특이사항

모든 서비스(Application Server, Web Server, DB 등) 이 Docker로 관리되어 있습니다. 또한 내부 docker network 로 묶여 있어 특정 서버만 외부로부터 접근이 가능합니다.

Oasys(Team. dolfin) 의 서버내 컨테이너의 목록은 다음과 같이 요약할 수 있습니다. 
 - service Container 목록
    - manager-server
 - DB Container 목록
    - MariaDB
    - Redis
 - Monitoring Container 목록
    - Prometheus
    - Grafana
 - deploy Container 목록
    - Jenkins
    - oasys (Nginx)
    
각 서비스들은 특정 branch에 push/PR시에 Jenkins 가 저장소(gitLab)으로부터 소스를 받아 빌드를 합니다. 파이프라인 스크립트를 통해 archive 파일들은 docker container 로 빌드를 진행합니다.

---

- <i><b>Grafana</b></i>

http://j9a106.p.ssafy.io:3000
에서 <admin> / <zxcv1234> 로 로그인 후에 서버의 상태를 확인할 수 있습니다.


## 프로젝트에서 사용한 외부 서비스 정보

1. 

## DB 덤프파일 최신본



## 시연 시나리오