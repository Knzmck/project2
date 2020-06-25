$(document).ready(function() {
    var feedbackForm = $("form.feedback");
    var authorInput = $("input#authorName-input");
    var helpfulInput = $("input#helpful-input");
    var commentInput = $("input#comment-input");
    var postIdInput = $("input#postId-input");
 
    feedbackForm.on("submit", function(event) {
        console.log("I AM A CLICK EVENT")
        event.preventDefault();
        var feedbackData = {
          authorName: authorInput.val().trim(''),
          helpful: helpfulInput.val().trim(''),
          comment: commentInput.val().trim(''),
          postId: postIdInput.val()
        };
        console.log(JSON.stringify(feedbackData))
        // If we have an email and password we run the loginUser function and clear the form
        createFeedback(feedbackData.authorName, feedbackData.helpful, feedbackData.comment, feedbackData.postId);
      });

      function createFeedback(authorName,helpful,comment,postId) {
        $.post("/api/feedback", {
            authorName: authorName,
            helpful: helpful,
            comment: comment,
            postId: postId
        })
          .then(function() {
              console.log("post success")
            // window.location.replace("/homepage");
            // If there's an error, log the error
          })
          .catch(function(err) {
            console.log(err);
          });
      }
})