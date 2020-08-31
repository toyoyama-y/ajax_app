function memo() {
// メモを投稿した時してページを読み込んだ時に実行される
  const submit = document.getElementById("submit");
// 投稿するボタンの情報を取得してる

  submit.addEventListener("click", (e) => {
// 投稿ボタンをクリックした場合に実行される関数定義
    const formData = new FormData(document.getElementById("form"));
// FormDataとsendを使ってメモ投稿フォームに入力された情報を送信してる
    const XHR = new XMLHttpRequest();
// XMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);
// openメソッドを使ってリクエスト内容を引数に追記してる
// HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.responseType = "json";
// 返却されるデータ形式はJSONなのでjsonを指定
    XHR.send(formData);
// 8行目とセット

    XHR.onload = () => {
      // onloadで受信が成功した場合に呼び出されるイベントハンドラーを記述
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
    // レスポンスとして返却されたメモのレコードデータを取得してる
      const list = document.getElementById("list");
      // 描画する親要素のlistの要素を取得
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
    // このコードは、「メモとして描画する部分のHTML」を定義している
      list.insertAdjacentHTML("afterend", HTML);
    // listという要素に対して、insertAdjacentHTMLでHTMLを追加している
      formText.value = "";
    // 「メモの入力フォームに入力されたままの文字」はリセットされる
    };
    e.preventDefault();
// プログラム本来の処理をこの記述で停止させてる
  });
}
window.addEventListener("load", memo)
