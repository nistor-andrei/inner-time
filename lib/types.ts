interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface SignForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}
