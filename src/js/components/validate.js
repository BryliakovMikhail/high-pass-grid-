import JustValidate from "just-validate";

const validateAboutUs = new JustValidate("#about-us__form", {
  errorLabelStyle: {
    color: "#F06666",
    fontSize: "9" + "px",
  },
});
validateAboutUs.addField(
  "#about-us__email",
  [
    {
      rule: "required",
      errorMessage: "Поле обязательно для заполнения",
    },
    {
      rule: "email",
      errorMessage: "Недопустимое значение",
    },
  ],
  {
    errorsContainer: ".about-us__errors-email",
  }
);

const validateContacts = new JustValidate("#contacts-form", {
  errorLabelStyle: {
    color: "#F06666",
    fontSize: "9" + "px",
  },
});
validateContacts
  .addField(
    "#contacts-name",
    [
      {
        rule: "required",
        errorMessage: "Поле обязательно для заполнения",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Недопустимое значение",
      },
      {
        rule: "maxLength",
        value: 15,
        errorMessage: "Недопустимое значение",
      },
      {
        rule: 'customRegexp',
        value: /^[\p{L}\p{M}\s-]+$/u,
        errorMessage: "Недопустимое значение",
      },
    ],
    {
      errorsContainer: ".contacts__errors-name",
    }
  )
  .addField(
    "#cotacts-email",
    [
      {
        rule: "required",
        errorMessage: "Поле обязательно для заполнения",
      },
      {
        rule: "email",
        errorMessage: "Недопустимое значение",
      },
    ],
    {
      errorsContainer: ".contacts__errors-email",
    }
  );
