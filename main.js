const message_box = document.querySelector('.message_box');
const btn_twitter = document.querySelector('.btn_twitter');
const btn_newQuote = document.querySelector('.btn_newQuote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const loader = document.querySelector('.loader');

// show loading animation
function loading() {
    loader.hidden = false;
    message_box.hidden = true;
};

//  hide loading
function loadingDone() {
    if (!loader.hidden) {
        loader.hidden = true;
        message_box.hidden = false;
    }
};

async function getQuote() {
    // start loading animation
    loading();

    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        // console.log(data.quoteText)

        btn_newQuote.addEventListener('click', () => {
            // getting new quote when button is clicked
            getQuote()
            // changing the quote content
            quote.textContent = data.quoteText;
            // if quote text is longer then 120char, let it be smaller font size
            if (data.quoteText.length > 120) {
                quote.style.fontSize = '1.5rem';
                author.style.fontSize = '1.2rem';
            }

            // if author is empty, then say author is uknown
            if (data.quoteAuthor === '') {
                author.textContent = "Uknown";
            } else {
                author.textContent = data.quoteAuthor;
            }
            // stop loading animation and show the quote
            loadingDone();
        });
    } catch (error) {
        // getQuote()
        console.log('something is wrong', error);
    }

}

function sendTweet() {
    const twQuote = quote.textContent;
    const twAuthor = author.textContent;
    const twUrl = `https://twitter.com/intent/tweet?text=${twQuote} - ${twAuthor}`;
    // open new tab with twitter url and send quote
    window.open(twUrl, '_blank');
}
// twitter button event listener
btn_twitter.addEventListener('click', sendTweet);

if (loading) {
    setTimeout(loadingDone, 1000);
};
getQuote()




