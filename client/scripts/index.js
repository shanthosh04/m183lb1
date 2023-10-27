document.addEventListener("DOMContentLoaded", () => {
  const newTweetInput = document.getElementById("new-tweet");
  const postTweetButton = document.getElementById("post-tweet");
  const logoutButton = document.getElementById("logout");

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
  }

  const generateTweet = (tweet) => {
    const date = new Date(tweet.timestamp).toLocaleDateString("de-CH", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const tweetElement = `
        <div id="feed" class="flex flex-col gap-2 w-full">
            <div class="bg-slate-600 rounded p-4 flex gap-4 items-center border-l-4 border-blue-400" >
                <img src="./img/tweet.png" alt="SwitzerChees" class="w-14 h-14 rounded-full" />
                <div class="flex flex-col grow">
                <div class="flex flex-col gap-2">
                    <div class="flex justify-between text-gray-200">
                    <h3 class="font-semibold">${tweet.username}</h3>
                    <p class="text-sm">${date}</p>
                    </div>
                </div>
                <p>${tweet.text}</p>
                </div>
            </div>
        </div>
      `;
    return tweetElement;
  };

  const getFeed = async () => {
    const response = await fetch(`/api/feed`, {
      headers: {
        authorization: "Bearer" + token,
      }
  });
    const tweets = await response.json();
    const tweetsHTML = tweets.map(generateTweet).join("");
    document.getElementById("feed").innerHTML = tweetsHTML;
  };

  const postTweet = async () => {
    const timestamp = new Date().toISOString();
    const text = newTweetInput.value;
    const data = {timestamp, text};
    
    await fetch("/api/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer" + token
      },
      body: JSON.stringify( data ),
    });
    await getFeed();
    newTweetInput.value = "";
  };

  postTweetButton.addEventListener("click", postTweet);
  newTweetInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      postTweet();
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  });

  getFeed();
});
