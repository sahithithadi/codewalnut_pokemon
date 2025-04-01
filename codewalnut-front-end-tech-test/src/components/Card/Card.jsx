import "./Card.css";
import Image from "next/image";

const Card = (props) => {
  const { name, id, type, exp, species, url, stats, abilities } = props;
  return (
    <div className="card-box">
      <Image
        className="card-image"
        src={url}
        alt={`${name} logo`}
        width={180}
        height={38}
        priority
        id={id}
      />
      <div className="card-value">
        <h2 className="card-name">
          <strong>##{id}</strong>
        </h2>
        <h2 className="card-name">
          <strong>{name.toUpperCase()}</strong>
        </h2>
        <h2 className="card-type">{type}</h2>
      </div>
    </div>
  );
};

export default Card;
