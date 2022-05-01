# 地震計アプリ(Seismometer app)

テスト版のお試しはこちら → https://test-quake.hanadamaya.net/  
Please try this app: https://test-quake.hanadamaya.net/  

このプロジェクトはAngularフレームワークを用いて作成されています。  
また、素敵なサービスや素材などを利用してこのアプリケーションが成り立っています。  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.
And, it consists of many useful services and free materials.  
I would like to thank below cool products.
* 「P2P地震情報 JSON API v2」https://www.p2pquake.net/json_api_v2/
* 「立ち絵素材　ボブの女の子」https://booth.pm/ja/items/2996866
* 「Cubism SDK」https://www.live2d.com/download/cubism-sdk/
  

## Before building or running

ライセンスの関係から、本アプリケーションはテスト用として公開されております。  
また、Live2Dを動かすための各種SDKは下記の通りダウンロードしてください。  
※Live2D®は株式会社Ｌｉｖｅ２Ｄの商標です。  

Please download Cubism SDK for Web. This is indispensable to run Live2D.  
Download [here](https://www.live2d.com/download/cubism-sdk/) and unzip it.
Move `Framework` folder to `src/app/livd2d-page`, `Core` folder to `src/assets`.
  

## Development server

デフォルトでは開発環境の設定で立ち上がります。そして、地震情報はローカル環境のモックサーバを想定したエンドポイントにアクセスして取得します。  
開発の際はAPIサーバへの負荷を軽減するためMockを利用してください。試用、評価の際は本番環境としてビルドしてください。  
APIの仕様は[こちら](https://www.p2pquake.net/json_api_v2/)をご確認ください。  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  

本アプリで使用するエンドポイントは下記の通り。  
Quake API mock address is `http://127.0.0.1:3000/test`, which is a endpoint and uses two query params.  

* Get most latest quake data.  
http://127.0.0.1:3000/test?limit=1&order=-1

* Get recent quake data list.  
http://127.0.0.1:3000/test?limit=15&order=-1

Please use a mocking app like Mockoon for test.  
And, read [here](https://www.p2pquake.net/json_api_v2/) for API specifications because it's a mock of the endpoint `https://api.p2pquake.net/v2/jma/quake`.  

実際にP2P地震情報 JSON API v2に接続する場合は本番環境設定で立ち上げてください。  
(Run `ng serve --configuration production` for prod env.)  
  

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.  
  

## Build

実際にP2P地震情報 JSON API v2に接続する場合は本番環境設定でビルドしてください。  

Run `ng build --configuration production` to build the project. The build artifacts will be stored in the `dist/` directory.  
  

## Further help

ご不明な点がございましたら、Twitterまでご連絡ください。  
当方BtoB基幹システム系をメインとした経験の浅いエンジニアです。オープンソースやWeb開発の知見がなく、自己研鑽も兼ねてアプリケーション開発をしております。  
至らない点も多々あるかと思いますがご指導いただければ幸いです。  
I think everyone reading this page is more familiar with programming, so please help me.  

***

このアプリケーションで利用している「P2P地震情報 JSON API v2」は気象庁 地震情報・津波予報: CC BY 4.0 準拠であり、気象庁の情報を利用しています（[気象庁 | 著作権・リンク・個人情報保護について](https://www.jma.go.jp/jma/kishou/info/coment.html)）。  
本アプリケーション、もしくはソースコードの利用によるいかなる損害についても、一切の責任を負いません。また、情報の正確性も一切保証しません。  