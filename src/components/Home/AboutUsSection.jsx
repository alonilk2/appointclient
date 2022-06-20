import shield from "../../images/shield.png";
import point from "../../images/point.png";
import user from "../../images/user.png";

const DescriptionCard = (props) => {
  return (
    <div className="description-card">
      <img alt="icon" src={props.image}></img>
      <p>
        `Nullam non pulvinar nisl. <br />
        Fusce nec metus a ipsum consequat lobortis. <br />
        Curabitur efficitur bibendum magna et consectetur.`
      </p>
    </div>
  );
};

export const AboutUsSection = () => {
  return (
    <section className="about-us-container">
      <div className="description">
        <h2 className="title">מי אנחנו</h2>
        <p>
          Nullam non pulvinar nisl. Fusce nec metus a ipsum consequat lobortis.
          <br />
          Curabitur efficitur bibendum magna et consectetur. Praesent nec
          <br />
          pellentesque urna, ac porttitor leo. Vestibulum ultrices semper leo a
          ultricies.
        </p>
      </div>
      <div className="icons-row">
        <DescriptionCard image={shield} />
        <DescriptionCard image={point} />
        <DescriptionCard image={user} />
      </div>
    </section>
  );
};
