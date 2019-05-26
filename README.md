# pet-shop-zh 增加 CryptoSeafood 中文版筆記

## 8bit 漢字/中文字體
使用 8×8 ドット日本語フォント「美咲フォント」
http://littlelimit.net/misaki.htm#download

```
<style type="text/css">
@font-face {
font-family:'misakigothic';
src: url('misaki_gothic.eot');
src: url('misaki_gothic.woff') format('woff'),
url('misaki_gothic.ttf') format('truetype');
}

.misaki {
font-family:'misakigothic';
font-size:16px;
}
</style>
```
主要參考這篇
https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11155829391 

## Solidity Withdraw by Owner 
記得要先在 construct function 裡面指定 owner
owner = msg.sender;
Code: https://etherscan.io/address/0xec12d40b04f83f2cff3e7edc5d2d30f2b785a01a#code

## 增加 ssh
先弄這個 https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04

## 把 node app 變自動開機啟動
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04#step-3-—-installing-pm2
pm2 startup systemd
pm2 save

## 修改 pm2 app 名稱
pm2 restart app --name "new-name" --update-env

## 增加 subdomain
https://www.digitalocean.com/community/questions/how-to-create-subdomain-with-nginx-server-in-the-same-droplet
不過最後還是用了這個轉 port
https://stackoverflow.com/questions/23649444/redirect-subdomain-to-port-nginx-flask

## 增加 subdomain ssh
sudo certbot --nginx -d sub.domain.com
