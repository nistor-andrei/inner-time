interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}
