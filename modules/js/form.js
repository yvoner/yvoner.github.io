function parseQueryString(query) {
  if (typeof query === 'undefined' || !query.length) {
    return false;
  }

  if (query.charAt(0) === '?') {
    query = query.substring(1);
    return query;
  }
}

$(document).ready(function() {
  var form = $(".forms");
  var validPhone = false;
  var validEmail = false;
  var phone = form.find('input[name="tel"]');
  var email = form.find('input[name="email"]');
  var locationSearchData = "";

  var phoneTypingTimer;
  var emailTypingTimer;
  var doneTypingInterval = 1000;

  phone.keyup(function(){
    clearTimeout(phoneTypingTimer);
    if (phone.val()) {
      phoneTypingTimer = setTimeout(phoneDoneTyping, doneTypingInterval);
    }
  });

  function phoneDoneTyping () {
    var fullPhone = null;

    fullPhone = iti.getNumber();

    form.find('input[name="phone"]').val(fullPhone);
    isValidPhone(fullPhone, form);
  }

  email.keyup(function(){
    clearTimeout(emailTypingTimer);
    if (email.val()) {
      emailTypingTimer = setTimeout(emailDoneTyping, doneTypingInterval);
    }
  });

  function emailDoneTyping () {
    var value = email.val();

    isValidEmail(value, form);
  }

  $('input').keyup(function () {
    if($(this).val().length > 0){
      $(this).addClass('notEmpty');
    } else {
      $(this).removeClass('notEmpty');
    }
  });

  //locationSearchData = parseQueryString(location.search);

  function isValidPhone(phone, formNode) {
    var currentForm = formNode;
    var errorPhoneParagraph = currentForm.find("p.errorPhone");
    var phoneInput = currentForm.find('input[name="tel"]');
    var button = currentForm.find('button');
    var link = "/Valid_Phone.php";

    phoneInput.attr("disabled", "disabled");
    button.attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: link,
      data: { phone: phone },
      async: false,
      dataType: "json",
      success: function(data) {
        validPhone = data.valid;
        phoneInput.removeAttr("disabled", "disabled");
        button.removeAttr("disabled", "disabled");
        errorPhoneParagraph.html("");
        console.log("validPhone", validPhone);

        if (!validPhone) {
          setTimeout(function() {
            errorPhoneParagraph.html("You have entered an invalid phone number");
          }, 0)
          phoneInput.removeAttr("disabled", "disabled");
          button.removeAttr("disabled", "disabled");
          phoneInput.focus();
        }
      },
      error: function() {
        validPhone = false;
        errorPhoneParagraph.html("You have entered an invalid phone number");
        phoneInput.removeAttr("disabled", "disabled");
        button.removeAttr("disabled", "disabled");
        console.log("validPhone", validPhone);
        phoneInput.focus();
      }
    });

    return validPhone;
  }

  function isValidEmail(email, formNode) {
    var currentForm = formNode;
    var errorEmailParagraph = currentForm.find("p.errorEmail");
    var emailInput = currentForm.find('input[name="email"]');
    var button = currentForm.find('button');
    var link = "/Valid_Email.php";

    emailInput.attr("disabled", "disabled");
    button.attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: link,
      data: { email: email },
      async: true,
      dataType: "json",
      success: function(data) {
        validEmail = data.format_valid;
        emailInput.removeAttr("disabled", "disabled");
        button.removeAttr("disabled", "disabled");
        console.log("validEmail", validEmail);
        errorEmailParagraph.html("");

        if (!validEmail) {
          errorEmailParagraph.html("You have entered an invalid email address");
          emailInput.removeAttr("disabled", "disabled");
          emailInput.focus();
        }
      },
      error: function() {
        validEmail = false;
        errorEmailParagraph.innerHTML = "You have entered an invalid email address";
        emailInput.removeAttr("disabled", "disabled");
        button.removeAttr("disabled", "disabled");
        console.log("validEmail", validEmail);
        emailInput.focus();
      }
    });

    return validEmail;
  }

  phone.on("change", function(e) {
    var thisForm = $(this).closest("form");
    var fullPhone = null;

    fullPhone = iti.getNumber();

    thisForm.find('input[name="phone"]').val(fullPhone);
    isValidPhone(fullPhone, thisForm);
  });

  email.on("change", function(e) {
    var value = $(this).val();
    var thisForm = $(this).closest("form");

    isValidEmail(value, thisForm);
  });

  phone.on("keypress", function(e) {
    var char = /[0-9]/;
    var val = String.fromCharCode(e.which);
    var test = char.test(val);

    if (!test) return false;
  });

  form.on("submit", function(event) {
    event.preventDefault();

    var valid = true;
    var form = $(this);
    var data = form.serialize();
    var phone = form.find('input[name="tel"]');
    var terms = form.find('input[name="terms"]');
    var button = form.find("button");
    var errorField = form.find("p.error");
    var email = form.find('input[name="email"]');
    var input_name = form.find('input[name="name"]');
    var input_last_name = form.find('input[name="secondname"]');
    var tel_check = /[0-9]{4,11}$/;
    var email_check = /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (terms.length) {
      if (terms.prop( "checked" ) === false) {
        valid = false;
        terms.addClass('errorField');
      } else {
        terms.removeClass('errorField');
      }
    }

    input_name.map(function() {
      var field = $(this);
      if (field.val().length < 2) {
        valid = false;
        field.addClass("errorField").removeClass("goodField");
        form.find("p.errorInputName").text("Enter First Name");
      } else {
        field.removeClass("errorField").addClass("goodField");
        form.find("p.errorInputName").text("");
      }
    });

    input_last_name.map(function() {
      var field = $(this);
      if (field.val().length < 2) {
        valid = false;
        field.addClass("errorField").removeClass("goodField");
        form.find("p.errorInputSName").text("Enter Last Name");
      } else {
        field.removeClass("errorField").addClass("goodField");
        form.find("p.errorInputSName").text("");
      }
    });

    email.map(function() {
      var field = $(this);
      if (!(field.val().search(email_check) == 0)) {
        valid = false;
        field.addClass("errorField").removeClass("goodField");
        form.find("p.errorEmail").text("Enter valid email");
      } else {
        field.removeClass("errorField").addClass("goodField");
        form.find("p.errorEmail").text("");
      }
    });

    phone.map(function() {
      var field = $(this);
      if (!(field.val().search(tel_check) == 0)) {
        valid = false;
        field.addClass("errorField").removeClass("goodField");
        form.find("p.errorPhone").text("Enter existing phone number");
      } else {
        field.removeClass("errorField").addClass("goodField");
        form.find("p.errorPhone").text("");
      }
    });

    if (form.find(".selected-flag").attr("title") == "Unknown") {
      valid = false;
      errorField.text("Please select a country");
    }

    if (valid && validPhone && validEmail) {
      let oldTextBtn = button.html();

      button
        .attr("disabled", "disabled")
        .html("PLEASE WAIT...");

      $.ajax({
        method: "POST",
        url: "/mail.php",
        data: data,
        async: true,
        dataType: "json",
        error: function(e) {
          errorField.text("Our representatives are on their way to contact you!");
          console.log('error in ajax error');
          button
            .removeAttr("disabled", "disabled")
            .html(oldTextBtn);
          errorField.addClass("errorSuccess");
          setTimeout(function () {
            location.reload();
          },5000)
        },
        success: function(e) {
          var exist = e["exist"];
          var backOfficeUrl = e["redirect"];
          if (!exist) {
            if (backOfficeUrl) {
              location.replace(backOfficeUrl);
            } else {
              button
                  .removeAttr("disabled", "disabled")
                  .html(oldTextBtn)
                  .removeAttr("type", "submit")
                  .prop("type", "button");
              errorField.text(
                  "Our representatives are on their way to contact you!"
              );
              errorField.addClass("errorSuccess");
            }
          } else {
            errorField.text(
              "Our representatives are on their way to contact you!"
            );
            console.log('error in ajax success');
            button
              .removeAttr("disabled", "disabled")
              .html(oldTextBtn);
            errorField.addClass("errorSuccess");
          }
        }
      });
      return false;
    } else {
      return true;
    }
  });
});
