import axios from "axios";
import { useState } from "react";

const Contacts = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [sujet, setSujet] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [subjectError, setSubjectError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setNameError(false);
    setEmailError(false);
    setSubjectError(false);
    setMessageError(false);
    try {
      const response = await axios.post(
        "https://site--formulaire--hpyqm5px6d9r.code.run/form",
        { email, name, sujet, message }
      );
      console.log(response.data);
      setSuccess("Your message have been sent");
    } catch (error) {
      if (!email || !name || !sujet || !message) {
        setError("Tout les champs doivent être remplis");
        if (!email) {
          setEmailError(true);
        }
        if (!name) {
          setNameError(true);
        }
        if (!sujet) {
          setSubjectError(true);
        }
        if (!message) {
          setMessageError(true);
        }
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleChange = (event: any, set: any) => {
    setError("");
    setSuccess("");
    setNameError(false);
    setEmailError(false);
    setSubjectError(false);
    setMessageError(false);
    set(event.target.value);
  };

  return (
    <div className="container">
      <form className="message" onSubmit={handleSubmit}>
        <h1>Contacts</h1>
        <div>
          <label htmlFor="name">Veuillez saisir votre nom :</label>
          <input
            className={nameError ? "errorRedBorder" : ""}
            type="text"
            id="name"
            placeholder="Votre nom"
            onChange={(event) => {
              handleChange(event, setName);
            }}
          />
        </div>

        <div>
          <label htmlFor="email">Veuillez saisir votre email</label>
          <input
            className={emailError ? "errorRedBorder" : ""}
            type="email"
            id="email"
            placeholder="Votre email"
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
        </div>

        <div>
          <label htmlFor="sujet">
            Veuillez saisir le sujet de votre message
          </label>
          <input
            className={subjectError ? "errorRedBorder" : ""}
            type="text"
            id="sujet"
            placeholder="Votre sujet"
            onChange={(event) => {
              handleChange(event, setSujet);
            }}
          />
        </div>

        <div>
          <label htmlFor="message">Veuillez saisir votre message :</label>
          <textarea
            //   type="text"
            className={messageError ? "errorRedBorder" : ""}
            id="message"
            rows={10}
            cols={64}
            name="message"
            placeholder="Votre message"
            onChange={(event) => {
              handleChange(event, setMessage);
            }}
          />
        </div>
        <div className="sendMessage">
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default Contacts;
