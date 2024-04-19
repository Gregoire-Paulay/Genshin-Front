const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
          <div className="footerDescription">
            <p>Grégoire Paulay</p>
            <p>56450 - Surzur, France</p>
            <a href="mailto:gregoirepaulay.pro@gmail.com">
              gregoirepaulay.pro@gmail.com
            </a>
            <p>06 23 29 73 02</p>
          </div>

          <div className="footerLink">
            <p> My Links</p>
            <a href="https://github.com/Gregoire-Paulay">Github</a>
            <a href="https://www.linkedin.com/in/grégoire-paulay-142384285/">
              Linkedin
            </a>
          </div>
        </div>

        <div className="footerMe">
          © Copyright 2024 - {""}
          <a href="https://my-portfolio-gp.netlify.app/">Grégoire Paulay</a> -
          Made with
          <a href="https://fr.legacy.reactjs.org/"> React</a> and{" "}
          <a href="https://www.typescriptlang.org/">Typescript</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
