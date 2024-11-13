import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Made for Unreal Engine",
    Svg: require("@site/static/img/homepage/undraw_gaming.svg").default,
    description: (
      <>
        Capsa is made specifically for Unreal Engine. No generic solution that tries to support every platform, but
        targetting one platform as best as possible.
      </>
    ),
  },
  {
    title: "Easy setup",
    Svg: require("@site/static/img/homepage/undraw_server.svg").default,
    description: (
      <>
        You can get Capsa working within an hour. Capsa is written to work without impact on game-code, with only small
        game code impact for additional features.
      </>
    ),
  },
  {
    title: "Deploy anywhere",
    Svg: require("@site/static/img/homepage/undraw_cloud.svg").default,
    description: (
      <>
        Capsa is written to be cloud agnostic. You can deploy it to any cloud platform, or on-premise. The documentation
        contains instructions to deploy all major cloud platforms.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
